const post_webhook = async (json, target_url) => {
	fetch('http://staging.joshtalks.org:9009/api/skill/v1/payment/webhook/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: `{"avi" : "Avi"}`,
	});
};

module.exports = {
	post_webhook,
};
