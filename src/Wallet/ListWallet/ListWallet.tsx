

import { Button, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { FC } from 'react';
import { useWallets } from '../../hooks/useWallets';

const ListWallet: FC = () => {

  const { isLoading, isError, error, data } = useWallets();
  return (
    <div>
      {isError && 
        <div>An error happened: {error?.message}</div>
      }
      {">>>>" + JSON.stringify(data)}
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
              {data !== undefined && data.map(wallet => (
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