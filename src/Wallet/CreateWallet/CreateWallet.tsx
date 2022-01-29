import { Button, Grid, TextField, Paper, Card, CardContent, CardHeader } from '@material-ui/core';
import { useState } from 'react';

import {useMutation} from 'react-query'
import WalletService from '../../service/WalletService';
import { ApiError } from '../../domain/error';

export default function CreateWallet() {
  const [walletName, setWalletName] = useState('');
  const [apiError, setApiError] = useState<ApiError>({errors: []})
  const [walletNameApiError, setWalletNameApiError] = useState("")

  const { isLoading: isPostingWallet, mutate: postWallet } = useMutation<any, Error>(
    async () => {
      return await WalletService.create({name: walletName})
    },
    {
      onSuccess: (res) => {
        setApiError({errors: []});
        setWalletNameApiError("");
      },

      onError: (res, any) => {
        const errorBody = JSON.stringify(res)        
        var apiError: ApiError = JSON.parse(errorBody)
        
        setWalletNameApiError(apiError.errors[0].description);
        setApiError(apiError);
      }
    }
  )

  function postData() {
    try {
      postWallet();
    } catch(err) {
      // console.error(err);
    }
  }

  return (
    <div>
        <Card>
          <CardHeader title="wallets/create" data-testid="createWalletHeader"/>
          <CardContent>
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