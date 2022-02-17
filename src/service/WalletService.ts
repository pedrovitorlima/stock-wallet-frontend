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

const list = async ():Promise<Wallet[]> => {
  const res = await fetch('');

  if (res.ok) {
    return res.json();
  }

  throw new Error('Network response not ok');
}

const WalletService = {
  create,
  list
}

export default WalletService;