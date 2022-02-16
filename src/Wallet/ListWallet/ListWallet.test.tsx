import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ListWallet from "./ListWallet";
import { Wallet } from "../../domain/wallet";
import { useWallets } from "../../hooks/useWallets";

const mockedUseWallets = useWallets as jest.Mock<any>; 
jest.mock("../../hooks/useWallets");
describe('Given ListWallet component', () => {
  beforeEach(() => {
		mockedUseWallets.mockImplementation(() => ({ isLoading: true }));
	});

	afterEach(() => {
		jest.clearAllMocks();
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
      test('Then it should a list of wallets should be rendered', async () => {
        const wallets: Wallet[] = [{id: 1, name: 'wallet 1'}, {id: 2, name: 'wallet 2'}]

        mockedUseWallets.mockImplementation(() => ({ isLoading: false, data: wallets }));
        
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
