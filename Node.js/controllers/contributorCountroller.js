const request = require('request');

const secretKey = 'YOUR_FLUTTERWAVE_SECRET_KEY';

// Function to initiate debit from user's account
const debitUserAccount = (userId, amount) => {
  const requestBody = {
    account_bank: 'USER_BANK_CODE', // Replace with user's bank code
    account_number: 'USER_ACCOUNT_NUMBER', // Replace with user's account number
    amount: amount,
    currency: 'NGN', // Replace with your preferred currency
    tx_ref: 'unique_transaction_reference', // Replace with your unique transaction reference
    narration: 'Payment for service/product'
  };

  const requestOptions = {   
    
    url: 'https://api.flutterwave.com/v3/debit-accounts',
    method: 'POST',
    headers: {
      'Authorization': Bearer ${secretKey},
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  };

  request(requestOptions, (error, response, body) => {
    if (!error) {
      console.log('Debit initiated successfully:', body);
      // Handle the response here (e.g., update your system on successful debit)
    } else {
      console.error('Error initiating debit:', error);
      // Handle error scenarios
    }
  });
};

// Example usage - initiate debit for a user
debitUserAccount('user_id_here', 5000); // Replace 'user_id_here' with the actual user ID and 5000 with the amount to debit