import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ListWallet from "./ListWallet";
import { Wallet } from "../../domain/wallet";
import { useFetchAllWallets } from "../../hooks/useFetchAllWallets";

const mockedUseFetchAllWallets = useFetchAllWallets as jest.Mock<any>; 
jest.mock("../../hooks/useFetchAllWallets");

describe('Given ListWallet component', () => {
  beforeEach(() => {
		mockedUseFetchAllWallets.mockImplementation(() => ({ isLoading: false }));
	});

  describe('When the component renders', () => {

    it('should render a loading message', () => {
      mockedUseFetchAllWallets.mockImplementation(() => ({ isLoading: true }));

      renderComponent();
      
      screen.getByText('Loading wallets');
    });
    
    it('should render a header', () => {
      renderComponent();

      screen.getByText("wallets/list");
    });
    
    it('should render a data grid', () => {
      renderComponent();

      const dataGrid = screen.getByTestId("dataGrid");
      expect(dataGrid).toBeInTheDocument();
    });

    it('should render a button to create new wallets', () => {
      renderComponent();

      const newWalletButton = screen.getByTestId("newWalletButton");
      expect(newWalletButton).toBeInTheDocument();
    });
    describe('And there are wallets created', () => {
      it('should render a list of wallets', async () => {
        const wallets: Wallet[] = [{id: 1, name: 'wallet 1'}, {id: 2, name: 'wallet 2'}]

        mockedUseFetchAllWallets.mockImplementation(() => (
          { data: wallets, 
            error: undefined, 
            isLoading: false, 
            isError: false
          }));
        
        renderComponent();
        
        screen.getByText("wallet 1");
      }); 

      it('should hide the loading message after render', () => {
        mockedUseFetchAllWallets.mockImplementation(() => ({ isLoading: false, }));
        
        renderComponent();
        
        const loadingMessage = screen.queryByText('Loading wallets');
        expect(loadingMessage).not.toBeInTheDocument();
      })
    });
    
  });
});

function renderComponent() {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ListWallet />
    </QueryClientProvider>
  );
}
