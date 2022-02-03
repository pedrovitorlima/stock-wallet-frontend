

import { Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

export default function ListWallet() {

  return (
    <div>
      <Card>
        <CardHeader title="wallets/create" data-testid="createWalletHeader"/>
        <CardContent>
          <Grid container spacing={1}>
          <Table aria-label="simple table" data-testid="dataGrid">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Wallet Name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell align="right">{1}</TableCell>
                <TableCell align="right">{"Wallet1"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
