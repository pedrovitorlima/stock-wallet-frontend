import { useQuery } from "react-query"
import { ApiError } from "../domain/error"
import { Wallet } from "../domain/wallet"
import WalletService from "../service/WalletService"


export const useWallets = () => {
  return useQuery<Wallet[], ApiError>("wallets", () => WalletService.list(), { retry: false })

}