import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Given APP component', () => {
  describe('When application is loaded', () => {
    test('Then the user will see a link for Wallets', () => {
      renderComponent();
      const walletsLink = screen.getByTestId("wallets-link")
      expect(walletsLink).toBeInTheDocument();
    });
    
    test('Then the user will see a link for Main page', () => {
      renderComponent();
      const mainLink = screen.getByTestId("main-link")
      expect(mainLink).toBeInTheDocument();
    });
    
  });

  describe('When the user click on Wallet link', () => {    
    test('Then it should render the Wallet main page', () => {
      renderComponent();
      const walletsLink = screen.getByTestId("wallets-link")
      fireEvent.click(walletsLink);

      const dataGrid = screen.getByTestId("dataGrid")
      expect(dataGrid).toBeInTheDocument();
    });
    
  });
});

function renderComponent() {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter><App/></BrowserRouter>
    </QueryClientProvider>
  );
}