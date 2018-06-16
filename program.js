#!/usr/bin/env node
const program = require('commander');
const winston = require('winston');
const lib = require('./lib');

const log = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
})

program
  .command('calculate <base_currency> <amount> <target_currency>')
  .action(async (base, amount, target) => {
    let prices = await lib.getAllPrices();

    console.log(`1 BTC = ${prices[base]} ${base}`)
    console.log(`1 BTC = ${prices[target]} ${target}`)

    let targetAmount = await lib.convert({ currency: "XAU", value: amount }, 'ETH');

    console.log(`${amount} ${base} = ${targetAmount} ${target}`);
  });

program.parse(process.argv);

