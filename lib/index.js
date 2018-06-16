const http = require('superagent');

async function getLegacyPrices() {
  let resp = await http.get('https://api.anypay.global/base_currencies');  
  return resp.body.rates;
}

async function getCryptoPrices() {
  let resp = await http.get('https://api.coinmarketcap.com/v1/ticker');
  return resp.body.reduce((accumulator, item) => {
    accumulator[item.symbol] = 1 / parseFloat(item.price_btc);
    return accumulator;
  }, {});
}

async function getAllPrices() {
  let legacyPrices = await getLegacyPrices();
  let cryptoPrices = await getCryptoPrices();

  return Object.assign(legacyPrices, cryptoPrices);
}

async function convert(baseAmount, targetCurrency) {
  let prices = await getAllPrices();
  let rate = prices[targetCurrency] / prices[baseAmount.currency];

  let targetAmount = baseAmount.value * rate;

  return targetAmount;
}

module.exports = {
  convert, getAllPrices, getCryptoPrices, getLegacyPrices
};

