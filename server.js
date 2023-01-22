// console.log('Server running at http://127.0.0.1:30043');

var PROTO_PATH = './client_server.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const scraper = require('./web_scrape.js');

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

function getResponse(model_name, search_url) {
	const scraped_json = scraper.getAllSearchResults(model_name, search_url);
	return scraped_json;
}

async function SendWebhookData(call, callback) {
	console.log('Hit the request on Node');
	var request = call.request;
	var model_name = request.model_name;
	console.log(model_name);
	var res = await getResponse(model_name, 'https://www.gsmarena.com/');
	callback(null, { json_data: JSON.stringify(res) });
}

function getServer() {
	var server = new grpc.Server({ GRPC_ARG_ENABLE_HTTP_PROXY: 0 });
	server.addService(data.service, {
		SendWebhookData: SendWebhookData,
	});
	return server;
}

var routeServer = getServer();
routeServer.bindAsync('[::]:50051', grpc.ServerCredentials.createInsecure(), () => {
	routeServer.start();
	console.log('Sever started on port === grpc-server:50051');
});
