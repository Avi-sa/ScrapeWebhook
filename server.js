// console.log('Server running at http://127.0.0.1:30043');

var PROTO_PATH = './client_server.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy

// console.log(protoDescriptor.Data);
var data = protoDescriptor.Data;

function checkFeature(point) {
	var feature;
	feature = {
		price: 10,
	};
	return feature;
}

function SendWebhookData(call, callback) {
	console.log('Hit the request on Node');
	var request = call.request;
	var model_name = request.model_name;
	console.log(model_name);
	console.log(checkFeature(call.request));
	callback(null, checkFeature(call.request));
}

// console.log(data.service);

function getServer() {
	var server = new grpc.Server();
	server.addService(data.service, {
		SendWebhookData: SendWebhookData,
	});
	return server;
}
var routeServer = getServer();
routeServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
	routeServer.start();
	console.log('Sever started on port === 0.0.0.0:50051');
});
