import axiosInstance from '../libs/axiosInstance';

async function postPaymentQuote(amount: number) {
  return axiosInstance.post('/mojaloop/quote', { amount });
}

async function postPaymentTransfer(amountToPay: number) {
  return axiosInstance.post('/mojaloop/transfer', { amountToPay });
}

export { postPaymentQuote, postPaymentTransfer };
