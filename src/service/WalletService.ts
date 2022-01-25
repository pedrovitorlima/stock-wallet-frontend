import axios from "axios";
import { Wallet } from "../domain/wallet";

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "Content-Type": "application/json", 
  },
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': "POST, GET, OPTIONS, PUT, DELETE"
}


const create = async ({ name }: Wallet) => {
  const response = await axios.post<any>(
    "http://localhost:4000/wallet", 
    { name }, 
    { headers: headers });

  return response.data;
}

const WalletService = {
  create
}

export default WalletService;