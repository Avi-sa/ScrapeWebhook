// Importing the express module
const express = require('express');

// calling the express function
const app = express();

const scraper = require('./web_scrape.js');

// Creating a "/home" route for sending "Hello World!😎😎" to the clientSide(Browser)
app.get('/home', (req, res) => {
	res.status(200).send('<h1>Hello Worlds!😎😎</h1>');
});

// Route for xiaomi_redmi_note_10_pro-10662.php
app.post('/api', async (req, res) => {
	try {
		body = req.body;
		const model_prices = await scraper.getAllSearchResults(
			'Redmi note 10',
			'https://www.gsmarena.com/',
		);
		console.log(model_prices);
		return res.status(200).json({
			result: model_prices,
		});
	} catch (err) {
		console.log(err.toString());
		return res.status(500).json({ err: err.toString() });
	}
});

// declaring our Port number variable
const PORT = 4000 || process.env.PORT;

// Creating a server with the PORT variable declared above
app.listen(PORT, () => {
	console.log(`Listening to Port ${PORT}`);
});
