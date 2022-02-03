import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('Given APP component', () => {

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter><App/></BrowserRouter>
    )
  })
  describe('When application is loaded', () => {
    
    test('Then the user will see a link for Wallets', () => {
      const walletsLink = screen.getByTestId("wallets-link")
      expect(walletsLink).toBeInTheDocument();
    });
    
    test('Then the user will see a link for Main page', () => {
      const mainLink = screen.getByTestId("main-link")
      expect(mainLink).toBeInTheDocument();
    });
    
  });

  describe('When the user click on Wallet link', () => {
    
    test('Then it should render the Wallet main page', () => {
      const walletsLink = screen.getByTestId("wallets-link")
      fireEvent.click(walletsLink);

      const dataGrid = screen.getByTestId("dataGrid")
      expect(dataGrid).toBeInTheDocument();
    });
    
  });
  
  
});
