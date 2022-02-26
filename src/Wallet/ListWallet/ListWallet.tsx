

import { Button, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ApiError } from '../../domain/error';
import { Wallet } from '../../domain/wallet';
import WalletService from '../../service/WalletService';

const ListWallet: FC = () => {

  const [wallets, setWallets] = useState<Wallet[] | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const { isLoading: isLoadingWallets, refetch: getAllWallets } = useQuery<Wallet[], Error>(
    "query-wallets",
    async () => {
      const wallets = await WalletService.list();
      // console.log("fetched: " + JSON.stringify(wallets));
      return wallets;
    },
    {
      
      enabled: false,
      
      onSuccess: (res: Wallet[]) => {
        console.log('[onSuccess]: response is ' + JSON.stringify(res));
        setWallets(res);
      },

      onError: (err: any) => {
        console.log('[onError]: error is ' + err);
        const errorBody = JSON.stringify(err);      
        var apiError: ApiError = JSON.parse(errorBody);
        
        setApiError(apiError.message);      
      },
    }
  );

  useEffect(() => {
    getAllWallets();
  });


  // // function getAllData() {
  // try {
  //   getAllWallets();
  // } catch (err) {
  //   // setGetResult(fortmatResponse(err));
  // }

  console.log('allWallets is ' + JSON.stringify(wallets));

  // }


  // try {
  //   fetchAll();
  // } catch (err: any) {
  //   setApiError(err);
  // }

  // console.log('getResult is >> ' + JSON.stringify(getResult));
  // console.log('apiError is >> ' + JSON.stringify(apiError));
  

  // const { isLoading, isError, error, data } = useWallets();
  return (
    <div>
      {apiError !== null && 
        <div>An error happened: {apiError}</div>
      }
      {">>>>" + JSON.stringify(wallets)}
      <Card>
        <CardHeader title="wallets/list"/>
        <CardContent>
          <Grid container spacing={1}>
          <Table aria-label="simple table" data-testid="dataGrid">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Wallet Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {wallets !== null && wallets.map(wallet => (
                <TableRow key={wallet.id}>
                  <TableCell align="right">{wallet.id}</TableCell>
                  <TableCell align="right">{wallet.name}</TableCell>
                  <TableCell align="center">
                    <Button variant="text" 
                      color="secondary"
                      aria-label='Edit'
                      size='small'
                      data-testid="goToEditWallet">
                        edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default ListWallet;