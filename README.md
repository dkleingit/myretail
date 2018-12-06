Welcome to myretail!

This node.js API retrieves product price information on a variety of retail products from multiple sources.

## Install and Run

1) Clone this repository from github

2) Install mongodb (this will store the pricing information)

    https://docs.mongodb.com/manual/installation/

3) Install Dependancies

    $ npm install
    
4) Load the data

    $ node loader.js
    
5) Run Tests

    $ npm test
    
6) Start the server

    $ node server.js
    

## API

HTTP GET request at /products/{id}
    
    Delivers product data as JSON where {id} will be a number.

Example response:

    {"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value": 13.49,"currency_code":"USD"}}

