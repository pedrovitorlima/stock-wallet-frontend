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
  );

  return { data, error, isLoading, isError }
}