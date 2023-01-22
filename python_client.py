import grpc

import client_server_pb2
import client_server_pb2_grpc


def run():
    with grpc.insecure_channel('0.0.0.0:50051') as channel:
        stub = client_server_pb2_grpc.DataStub(channel)
        print("Unary stub is going to execute ")
        rpc_call = input("Input you want to give the rpc:")

        if rpc_call:
            request = client_server_pb2.DataRequest(
                model_name="Redmi", webhook_url="http://www.google.com/")
            print("Request == ", request)
            stub.SendWebhookData(request)
            print("We got the response ")


if __name__ == "__main__":
    run()
