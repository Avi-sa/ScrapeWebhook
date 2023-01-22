import grpc

import client_server_pb2
import client_server_pb2_grpc

import requests


def run(model_name, webhook_url):
    with grpc.insecure_channel('grpc-server:50051', options=(('grpc.enable_http_proxy', 0),)) as channel:
        stub = client_server_pb2_grpc.DataStub(channel)

        request = client_server_pb2.DataRequest(
            model_name=model_name, webhook_url=webhook_url)
        response_data = stub.SendWebhookData(request)

        if response_data:

            import json
            from google.protobuf.json_format import MessageToJson

            grpc_response_data = MessageToJson(response_data)
            grpc_response_data = json.loads(grpc_response_data)

            json_webhook_body = json.loads(
                grpc_response_data['jsonData']
            )

            requests.post(
                webhook_url, json=json_webhook_body,
                headers={'Content-Type': 'application/json'}
            )

        print("We got the response === ", json.dumps(
            json_webhook_body, indent=2))


if __name__ == "__main__":
    run()
