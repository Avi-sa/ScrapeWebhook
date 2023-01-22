# ScrapeWebhook

-   Backend Service built using two servers of node and Python. Python service
    takes the request of model_name and webhook_url sends the request to the
    Node server using response of Scrapped data of www.gsmarena.com we send
    the details of the model and price and purchase_link as the response back
    to the webhook url.

![alt text](bharatX-Assignment.jpeg)

### Tech Used

-   Django, Node for creating api's and views.
-   Grpc for inter socket connection.
-   Docker

## Key Features

-   Scrape data using node service and sent to to Django Service
-   Data scraped is sent to the webhook url.
-   Containers are interacting based on dns-names instead of IP.

## Installation

```
curl --location --request POST 'http://127.0.0.1:8000/api/search/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model_name": "One Plus",
    "webhook_url": "http://staging.joshtalks.org:9009/dashboard/test_web/"
}'

```

\*

```
    $ docker-compose up
```

## Sample Request and Response JSON

#### Request

```
{
    "model_name": "Redmi Note 10",
    "webhook_url": "http://staging.joshtalks.org:9009/dashboard/test_web/"
}
```

##### Response

```
{'XiaomiRedmi Note 10 Pro': [
        {'price': '$\u2009221.00',
        'purchase_url': 'https://www.wirelessplace.com/products/xiaomi-redmi-note-10-pro-global-version-new#gsmarena'},
        {'price': '$\u2009199.99', 'purchase_url': 'https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=2&toolid=10044&campid=5338659500&customid=gsmarena&lgeo=1&vectorid=229466&item=265959585081'},
        {'price': '$\u2009249.50', 'purchase_url': 'https://www.amazon.com/dp/B08Z7BXYDD?tag=gsmarena093-20&linkCode=osi&th=1&psc=1'},
        {'price': '£\u2009348.00', 'purchase_url': 'https://www.awin1.com/pclick.php?p=33380414213&a=1169550&m=25205'}
    ],
    'XiaomiRedmi Note 10': [
        {'price': '£\u2009203.93',
        'purchase_url': 'https://www.amazon.co.uk/dp/B09RNDDX4X?tag=gsmcom-21&linkCode=osi&th=1&psc=1'},
        {
            'price': '$\u2009259.99', 'purchase_url': 'https://www.amazon.com/dp/B09CZ8MJCH?tag=gsmarena093-20&linkCode=osi&th=1&psc=1'
        },
        {'price': '€\u2009231.75', 'purchase_url': 'https://www.amazon.de/dp/B08Y8M8G4B?tag=gsmarena0ca-21&linkCode=osi&th=1&psc=1'}
    ]
}
```

## API TESTING

#### POST http://127.0.0.1:8000/api/search

-   POST model_name and webhook_url to the url. It should give success as
    true and send_data to the webhook_url.

## WHY Python & Node

### Python

-   Python's standard library is augmented by thousands of third-party libraries for writing REST services, and there's plenty of support available from the Python community of users.

-   Python is also a strongly typed language, meaning it ensures uniform consistency and minimizes errors by enforcing data types

#### Node

-   Node.js is fast, lightweight and efficient
-   It provides cross-platform applications which run easily on any web

##### Why Node for Scraping service

```
- Javascript is fast, as Node.js is based on a powerful Chrome V8 engine.
So will help scrape data fast.

- To utilize the benefit of async. call so that we don't need to wait for completion of each request.

- Node.js can efficiently handle many concurrent web page requests at a time,
so we handle multiple requests simultaneously.

- libraries written to be run natively on Node.js will be quite fast and helped in improved development speed.

```

# Why GRPC over HTTP requests:

```
- GRPC works on Protobuff but HTTP works on Json.

- Size of Json is more large as compared to Protocol Buffer.

- More fast than HTTP calls.

- It will be helpful if we plan to scale the service in future.

```
