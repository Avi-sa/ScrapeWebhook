# ScrapeWebhook

-   Backend Service built using two servers of node and Python. Python service
    takes the request of model_name and webhook_url sends the request to the
    Node server using response of Scrapped data of www.gsmarena.com we send
    the details of the model and price and purchase_link as the response back
    to the webhook url.

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
