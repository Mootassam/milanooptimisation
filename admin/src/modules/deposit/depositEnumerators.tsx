// src/modules/deposit/depositEnumerators.js

const status = ['pending', 'canceled', 'completed', 'failed'];
const paymentMethod = ['crypto', 'mobile_money'];
const cryptoCurrency = ['USDT', 'BTC', 'ETH'];
const network = ['TRC20', 'ERC20', 'BEP20'];
const mobileProvider = ['mtn', 'airtel', 'telecel', 'orange'];

export default {
  status,
  paymentMethod,
  cryptoCurrency,
  network,
  mobileProvider,
};