import axios from "axios";
import { ApiError } from "../domain/error";
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
    { headers: headers }
  )
  .then((response) => { 
    return Promise.resolve(response) 
  }).catch((error) => {
    const bodyError = JSON.stringify(error.response.data);
    const apiError: ApiError = JSON.parse(bodyError);
    return Promise.reject(apiError);
  })
}

const WalletService = {
  create
}

export default WalletService;