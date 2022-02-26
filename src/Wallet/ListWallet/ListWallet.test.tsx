import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ListWallet from "./ListWallet";
import { Wallet } from "../../domain/wallet";
import WalletService from "../../service/WalletService";

// const mockedUseWallets = WalletService as jest.Mock<any>; 
// jest.mock("../../service/WalletService");
describe('Given ListWallet component', () => {
  // beforeEach(() => {
	// 	mockedUseWallets.mockImplementation(() => ({ isLoading: true }));
	// });

  describe('When the component renders', () => {
    
    // test('Then it should show a header', () => {
    //   renderComponent();

    //   const header = screen.getByText("wallets/list");
    //   expect(header).toBeInTheDocument();
    // });
    
    // test('Then it should show a data grid', () => {
    //   renderComponent();

    //   const dataGrid = screen.getByTestId("dataGrid");
    //   expect(dataGrid).toBeInTheDocument();
    // });

    describe('And there are wallets created', () => {
      test('Then it should render a list of wallets should be rendered', async () => {
        const wallets: Wallet[] = [{id: 1, name: 'wallet 1'}, {id: 2, name: 'wallet 2'}]

        const listFn = jest.fn(() => {
          return Promise.resolve(wallets);
        });
  
        WalletService.list = listFn;
        
        renderComponent();
        
        await screen.findByText("wallet 1");

        // await waitFor(() => screen.findByText("wallet 1"));
      }); 
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
