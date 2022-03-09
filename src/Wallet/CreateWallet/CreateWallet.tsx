import { Button, Grid, TextField, Card, CardContent, CardHeader } from '@material-ui/core';
import { useState } from 'react';

import { useNavigate } from "react-router-dom";
import {useMutation} from 'react-query'
import WalletService from '../../service/WalletService';
import { ApiError } from '../../domain/error';

export default function CreateWallet() {
  const [walletName, setWalletName] = useState('');
  const [walletNameApiError, setWalletNameApiError] = useState("")
  const [genericErrorMessage, setGenericErrorMessage] = useState<string | null>(null);
  const history = useNavigate();

  const { isLoading: isPostingWallet, mutate: postWallet } = useMutation<any, Error>(
    async () => {
      return await WalletService.create({name: walletName})
    },
    {
      onSuccess: (res) => {
        setWalletNameApiError("");
      },

      onError: (err: any) => {
        const errorBody = JSON.stringify(err);      
        var apiError: ApiError = JSON.parse(errorBody);
        setGenericErrorMessage(apiError.message);
        setWalletNameApiError(apiError.errors[0].description);
      }
    }
  )

  function postData() {
    try {
      postWallet();
      history("/wallet");
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
        <Card>
          <CardHeader title="wallets/create" data-testid="createWalletHeader"/>
          <CardContent>
          {genericErrorMessage !== null && 
            <div data-testid="errorMessage">{genericErrorMessage}</div>
          }
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField variant="outlined" 
                  label={walletNameApiError.length !== 0? walletNameApiError : "Wallet Name"}
                  placeholder='Enter the wallet name'
                  required 
                  onChange={ (e) => {setWalletName(e.target.value)} }
                  error={walletNameApiError.length !== 0}
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
    </div>
  );
}