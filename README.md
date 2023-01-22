# ScrapeWebhook

-   Backend Service built using two servers of node and Python. Python service takes the request of model_name and webhook_url sends the request to the Node server using response of Scrapped data of www.gsmarena.com we send the details of the model and price and purchase_link as the response back to the webhook url.

### Tech Used

-   Django, Node and DRF for creating api's and views.
-   Grpc for inter socket connection.

## Key Features

-   Scrape data using node service and sent to to Django Service
-   Data returned is sent to the webhook url for the the push request.

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

#### GET http://127.0.0.1:8000/api/search

-   It returns the same data sent to the webhook URL.
