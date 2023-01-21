/* 
Axios is used to make HTTP requests. Run the command below to install the 
dependency.
*/
const axios = require('axios');

/*
Cheerio helps to parse markup, it is used to pick out HTML elements from 
a webpage.
*/
const cheerio = require('cheerio');

/* 
    Function returns the list of Prices of the particular model mobile url.
    It also returns the purchase url for each possible price. 
*/
const dataScraper = async function getDataScraper(url) {
	const priceArray = [];
	await axios(url).then((response) => {
		const html_data = response.data;
		const $ = cheerio.load(html_data);

		const selectedElem =
			'#wrapper > #outer > #body > div.main.main-review.right.l-box.col > table > tbody > tr';

		$(selectedElem).each((parentIndex, parentElem) => {
			const priceDetails = {};
			if (parentIndex >= 0) {
				$(parentElem)
					.children()
					.each((_, childElem) => {
						var value = $(childElem).text();
						var urls = $(childElem)
							.find('a')
							.attr('href');
						if (value && urls) {
							priceDetails['price'] = value;
							priceDetails['purchase_url'] = urls;
						}
					});
				priceArray.push(priceDetails);
			}
		});
	});
	return priceArray;
};

const getAllSearchResults = async (search, url) => {
	const searchKey = search.replaceAll(' ', '+');
	const searchUrl = url + 'res.php3?sSearch=' + searchKey;

	const response = await axios(searchUrl);
	const html_data = response.data;
	const $ = cheerio.load(html_data);

	const selectedElem =
		'#wrapper > #outer > #body > \
    div.main.right.main-maker.l-box.col.search-results > #review-body > \
    div.makers > ul';

	const result = {};

	var response_data = $(selectedElem).map(async (parentIndex, parentElem) => {
		const results = [];
		const model_names = [];
		if (parentIndex >= 0) {
			$(parentElem)
				.children()
				.each((_, childElem) => {
					var value = $(childElem).text();
					var mobile_url = $(childElem)
						.find('a')
						.attr('href');
					mobile_url = url + mobile_url;
					const model_wise_data = dataScraper(mobile_url);
					results.push(model_wise_data);
					model_names.push(value);
				});
		}
		const all_models_details = await Promise.all(results);
		model_names.forEach((element, i) => {
			result[element] = all_models_details[i];
		});
		return result;
	});
	await Promise.all(response_data);
	return result;
};

module.exports = {
	dataScraper,
	getAllSearchResults,
};
