/* 
Axios is used to make HTTP requests. Run the command below to install the 
dependency.
*/
const axios = require("axios");

/*
Cheerio helps to parse markup, it is used to pick out HTML elements from 
a webpage.
*/
const cheerio = require("cheerio");

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
      "#wrapper > #outer > #body > div.main.main-review.right.l-box.col > table > tbody > tr";

    $(selectedElem).each((parentIndex, parentElem) => {
      const priceDetails = {};
      if (parentIndex >= 0) {
        $(parentElem)
          .children()
          .each((_, childElem) => {
            var value = $(childElem).text();
            var urls = $(childElem).find("a").attr("href");
            if (value && urls) {
              priceDetails["price"] = value;
              priceDetails["purchase_url"] = urls;
            }
          });
        priceArray.push(priceDetails);
      }
    });
  });
  return priceArray;
};

const getAllSearchResults = async (search, url) => {
  const searchKey = search.replaceAll(" ", "+");
  const searchUrl = url + "res.php3?sSearch=" + searchKey;

  console.log(searchUrl);

  const res = {};

  await axios(searchUrl).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);

    const selectedElem =
      "#wrapper > #outer > #body > \
        div.main.right.main-maker.l-box.col.search-results > #review-body > \
        div.makers > ul";

    $(selectedElem).each(async (parentIndex, parentElem) => {
      const results = [];
      const model_names = [];

      if (parentIndex >= 0) {
        $(parentElem)
          .children()
          .each((_, childElem) => {
            var value = $(childElem).text();
            var mobile_url = $(childElem).find("a").attr("href");
            mobile_url = url + mobile_url;

            // console.log(mobile_url);

            const model_wise_data = dataScraper(mobile_url);
            // let t;
            // const device_data = async () =>{
            //     return await dataScraper(mobile_url);
            // };

            // const device_data = dataScraper(mobile_url);

            // console.log(device_data);

            // let device_price = "";
            // device_data().then((res)=>{
            //         // console.log(JSON.stringify(res), typeof(JSON.stringify(res)));
            //         // device_price = res;
            //         console.log(res);
            //         // results["mobile"] = value;
            //         // results["more_info"] = JSON.stringify(res);
            //         // return res;
            //     })

            // device_data();
            // console.log(t);
            // console.log(device);
            // console.log("device_price === ", device_price)

            // console.log(results);

            // console.log("model_wise_data = ", model_wise_data);

            results.push(model_wise_data);
            model_names.push(value);
          });
      }

      const all_models_details = await Promise.all(results);
      console.log("All models details === ", all_models_details);
      // console.log("All models == ", model_names);
      model_names.forEach((element, i) => {
        res[element] = all_models_details[i];
      });
      console.log("res == ", res);
    });
  });

  return res;
};

module.exports = {
  dataScraper,
  getAllSearchResults,
};
