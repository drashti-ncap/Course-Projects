import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//! Add Transaction
export const addTransactionAPI = async ({
  type,
  category,
  date,
  description,
  amount,
}) => {
  try {
    const token = getUserFromStorage();
    const response = await axios.post(
      `${BASE_URL}/transactions/create`,
      { category, date, description, amount, type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//! Update Transaction
export const updateTransactionAPI = async ({ type, category, date, description, amount, id }) => {
  try {
    const token = getUserFromStorage();
    const response = await axios.put(
      `${BASE_URL}/transactions/update/${id}`,
      { type, category, date, description, amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//! Delete Transaction
export const deleteTransactionAPI = async (id) => {
  try {
    const token = getUserFromStorage();
    const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//! List Transactions
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  try {
    const token = getUserFromStorage();
    const response = await axios.get(`${BASE_URL}/transactions/lists`, {
      params: { category, endDate, startDate, type },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};