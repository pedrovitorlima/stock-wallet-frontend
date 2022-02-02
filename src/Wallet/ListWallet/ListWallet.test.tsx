import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ListWallet from "./ListWallet";

describe('Given ListWallet component', () => {

  beforeEach (() => {
    const queryClient = new QueryClient();
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
        <QueryClientProvider client={queryClient}>
            <ListWallet />
        </QueryClientProvider>
    );
  });
  describe('When the component renders', () => {
    
    test('Then it should show a data grid', () => {
      const dataGrid = screen.getByTestId("dataGrid")
      expect(dataGrid).toBeInTheDocument();
    });
    
  });
  

});
