import { apiClient } from "@/app/utils/axios"
import axios from "axios"

export const getPopularProducts = async () => {
  const { data } = await apiClient.get("products/all")
  return data.data
}

export const getMyMachines = async () => {
  const { data } = await apiClient.get(`products/by-user`)
  return data.data
}

export const getProductById = async (id: number) => {
  const { data } = await apiClient.get(`products/${id}`)
  return data.data
}

export const referralHistory = async () => {
  const { data } = await apiClient.get(`referral/history`)
  return data
}

export const referralLink = async () => {
  const { data } = await apiClient.get(`referral/link`)
  return data.data
}

export const buyProduct = async (id: number) => {
  const { data } = await apiClient.post(`products/${id}/buy`)
  return data.data
}


export const initDeposit = async ( amount: number) => {
  const { data } = await apiClient.post(`deposit/init`, {  amount });
  return data; // This should return the whole response, which includes { reference: '...' }
};

export const postWebhook = async (data: any) => {
  return apiClient.post("/deposit/webhook", data);
};

export const getReferralTree = async () => {
  const { data } = await apiClient.get('referral/tree')
  return data
}

export const convertCurrency = async () => {
  const res = await axios.get(
    "https://api.exchangeratesapi.io/v1/latest?access_key=28efabef496f650d981f930739aa25e2"
  )
  return res.data
}
