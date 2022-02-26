

import { Button, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { FC, useState } from 'react';
import { ApiError } from '../../domain/error';
import { useFetchAllWallets } from '../../hooks/useFetchAllWallets';

const ListWallet: FC = () => {

  const [apiError, setApiError] = useState<string | null>(null);
  const { data, error, isLoading, isError } = useFetchAllWallets();

  if (isError) {
    const errorBody = JSON.stringify(error);      
    var responseError: ApiError = JSON.parse(errorBody);
    
    setApiError(responseError.message);      
  }

  return (
    <div>
      {apiError !== null && 
        <div>An error happened: {apiError}</div>
      }
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
              {data?.map(wallet => (
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