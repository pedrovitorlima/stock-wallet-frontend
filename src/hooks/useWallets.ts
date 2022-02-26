import { useQuery } from "react-query"
import { Wallet } from "../domain/wallet"
import WalletService from "../service/WalletService"


export const useFetchAllWallets = () => {
  const { data, error, isLoading, isError } =  useQuery<Wallet[], Error>(
    "query-wallets",
    async () => {
      const wallets = await WalletService.list();
      return wallets;
    }
    // ,
    // {
      
    //   enabled: false,
      
    //   onSuccess: (res: Wallet[]) => {
    //     console.log('[onSuccess]: response is ' + JSON.stringify(res));
    //     // setWallets(res);
    //   },

    //   onError: (err: any) => {
    //     console.log('[onError]: error is ' + err);
    //     const errorBody = JSON.stringify(err);      
    //     var apiError: ApiError = JSON.parse(errorBody);
        
    //     // setApiError(apiError.message);  
    //   },
    // }
  );

  return { data, error, isLoading, isError }
}