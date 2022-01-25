import { Button, Grid, TextField, Paper, Card, CardContent, CardHeader } from '@material-ui/core';
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
        <Card>
          <CardHeader title="wallets/create" />
          <CardContent>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField variant="outlined" 
                  label="Wallet Name"
                  placeholder='Enter the wallet name'
                  required 
                  onChange={ (e) => {setWalletName(e.target.value)} }
                  fullWidth
                  inputProps={{
                    "data-testid": "nameTextField",
                  }}
                ></TextField>
              </Grid>

              <Grid xs={12} item>
                <Button variant="contained" 
                  color="primary" 
                  onClick={postData} 
                  data-testid="submitButton">
                    Submit
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
        <p>{message}</p>
    </div>
  );
}