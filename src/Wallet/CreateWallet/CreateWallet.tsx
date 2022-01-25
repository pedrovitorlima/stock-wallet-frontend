import { useState } from 'react';

import {useMutation} from 'react-query'
import WalletService from '../../service/WalletService';

export default function CreateWallet() {
  const [message, setMessage] = useState('');
  const [walletName, setWalletName] = useState('');

  const { isLoading: isPostingWallet, mutate: postWallet } = useMutation<any, Error>(
    async () => {
      return await WalletService.create({name: walletName})
    },
    {
      onSuccess: (res) => {
        setMessage(`Success: ${res.message}`);
      },

      onError: (res, any) => {
        setMessage(`${res.message}`);
      }
    }
  )

  function postData() {
    try {
      postWallet();
    } catch(err) {
      setMessage(JSON.stringify(err, null, 2));
    }
  }

  return (
    <div>
        <h3>Wallets / Create wallet</h3>
        <input aria-label='Name' onChange={ (e) => {setWalletName(e.target.value)} }/>
        <button onClick={postData}>Submit</button>
        <p>{message}</p>
    </div>
  );
}


