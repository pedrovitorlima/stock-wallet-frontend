import './App.css';
import GlobalStyle from './styles/global'
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import ListWallet from './Wallet/ListWallet/ListWallet';
import CreateWallet from './Wallet/CreateWallet/CreateWallet';

const App = () => {

  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const routes: string[] = ['/', '/wallet']

  const handleChange = (_e: React.ChangeEvent<{}>, index: number) => {
    setValue(index);
    navigate(routes[index]);
  }

  const a11yProps = (index: number) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }


  return (    
    <div className="App">
      <GlobalStyle></GlobalStyle>   
      <AppBar position="static" color="default">
        <Tabs indicatorColor="primary"
          value={value}
          textColor="primary"
          aria-label="Navigation"
          onChange={handleChange}>
            <Tab label="Main" value={0} data-testid="main-link" {...a11yProps(0)}/>
            <Tab label="Wallets" value={1} data-testid="wallets-link" {...a11yProps(1)}/>
          </Tabs>
      </AppBar>
      
      <Routes>
        <Route path="/wallet">
          <Route index element={<ListWallet />} />
          <Route path="/wallet/create" element={<CreateWallet />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
