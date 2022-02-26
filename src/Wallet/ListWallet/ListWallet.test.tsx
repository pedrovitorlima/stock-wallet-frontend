import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ListWallet from "./ListWallet";
import { Wallet } from "../../domain/wallet";
import { useFetchAllWallets } from "../../hooks/useWallets";

const mockedUseFetchAllWallets = useFetchAllWallets as jest.Mock<any>; 
jest.mock("../../hooks/useWallets");

describe('Given ListWallet component', () => {
  beforeEach(() => {
		mockedUseFetchAllWallets.mockImplementation(() => ({ }));
	});

  describe('When the component renders', () => {
    
    test('Then it should show a header', () => {
      renderComponent();

      const header = screen.getByText("wallets/list");
      expect(header).toBeInTheDocument();
    });
    
    test('Then it should show a data grid', () => {
      renderComponent();

      const dataGrid = screen.getByTestId("dataGrid");
      expect(dataGrid).toBeInTheDocument();
    });

    describe('And there are wallets created', () => {
      test('Then it should render a list of wallets', async () => {
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
