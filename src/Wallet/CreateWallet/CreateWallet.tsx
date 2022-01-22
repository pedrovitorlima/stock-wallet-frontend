import React from 'react';

let errorMessage: string = '';

export default function CreateWallet() {
  return (
    <div>
        <h3>Wallets / Create wallet</h3>
        <input aria-label='Name' />
        <button>Submit</button>

        <p>{errorMessage}</p>
    </div>
  );
}

function validateWallet(walletName : string): boolean {

    if (walletName.length > 200) {
        errorMessage = 'Wallet name should be less or equals 200 characters';
    }

    return true;

}
