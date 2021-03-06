## Welcome to myRetail!

This node.js API provides price information on a variety of retail products.

## Install and Run

1. Clone this repository from github

    ```git clone https://github.com/dkleingit/myretail.git```

2. Install mongodb (this will store the pricing information)

    https://docs.mongodb.com/manual/installation/

3. Install Dependencies

    ```$ npm install```
    
4. Load the data

    ```$ node loader.js```
    
    Pricing information will be loaded for the following product ids:
    ```[13860424, 13860425, 13860428, 13860429, 13860433]```
    
5. Run the tests

    ```$ npm test```
    
6. Start the server

    ```$ node server.js```
    

## API

HTTP GET request at /products/{id}
    
    Delivers product data as JSON where {id} is a number.

HTTP PUT request at /products/{id}
    
    Updates the product's price in the data store and returns the updated record.
    
Example Request:

    http://localhost:8080/products/13860428

Example Response:

    {"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value": 13.49,"currency_code":"USD"}}

