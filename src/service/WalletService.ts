import axios from "axios";
import { useQuery } from "react-query";
import { ApiError } from "../domain/error";
import { Wallet } from "../domain/wallet";

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': "POST, GET, OPTIONS, PUT, DELETE"
  },
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': "POST, GET, OPTIONS, PUT, DELETE"
}


const create = async ({ name }: Wallet) => {
  const response = await apiClient.post<any>("/wallet", { name });
  return response.data;
}

const list = async () => {
  const response = await apiClient.get<Wallet[]>("/wallet");
  return response.data;
}

const WalletService = {
  create,
  list
}

export default WalletService;