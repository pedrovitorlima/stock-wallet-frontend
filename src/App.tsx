import CreateWallet from './Wallet/CreateWallet/CreateWallet';

import './App.css';
import GlobalStyle from './styles/global'
import Header from './Header/Header';

const App = () => {
  return (    
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <Header></Header>
      
      <div className='content'>
        <CreateWallet></CreateWallet>
      </div>
    </div>
  );
}

export default App;
