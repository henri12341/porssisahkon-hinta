import fetch from "node-fetch"

// Fetch data from API: https://porssisahko.net/api

const get_current_electricity_price = async() => {
    const PRICE_ENDPOINT = 'https://api.porssisahko.net/v1/price.json';

    const dateAndTimeNow = new Date();
    const date = dateAndTimeNow.toISOString().split('T')[0];
    const hour = dateAndTimeNow.getHours();

    const response = await fetch(`${PRICE_ENDPOINT}?date=${date}&hour=${hour}`);
    const { price } = await response.json();

    return price
}

const get_latest_prices = async() => {
    // prices from last 48 hours
    const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';
    const response = await fetch(LATEST_PRICES_ENDPOINT);
    const {prices} = await response.json();
    return prices;
}

// Ports

import express from 'express'

const app = express()
app.use(express.json());

app.use( (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
})

app.get("", async (req,res,next) => {
    res.json("Hello World")
})

app.get('/current_price', async (req,res,next) => {
    const price = await get_current_electricity_price()
    res.json(price)
})

app.get('/latest_prices', async (req,res,next) => {
    const price = await get_latest_prices()
    res.json(price)
})

const port = process.env.PORT || 5000
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Api is running on port ${port}`)
    })
}
export default app;