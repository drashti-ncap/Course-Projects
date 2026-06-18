import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//! Add Category
export const addCategoryAPI = async ({ name, type }) => {
  try {
    const token = getUserFromStorage();
    const response = await axios.post(
      `${BASE_URL}/categories/create`,
      { name, type },
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

//! Update Category
export const updateCategoryAPI = async ({ name, type, id }) => {
  try {
    const token = getUserFromStorage();
    const response = await axios.put(
      `${BASE_URL}/categories/update/${id}`,
      { name, type },
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

//! Delete Category
export const deleteCategoryAPI = async (id) => {
  try {
    const token = getUserFromStorage();
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//! List Categories
export const listCategoriesAPI = async () => {
  try {
    const token = getUserFromStorage();
    const response = await axios.get(`${BASE_URL}/categories/lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};