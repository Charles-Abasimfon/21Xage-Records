import axios from 'axios';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../context/authContext/AuthActions';

/* 
 desc: login admin
*/
export const login = async (admin, dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('/api/admin/login', admin);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response.data.message;
    dispatch(loginFailure(errorMsg));
  }
};

/* 
 desc: Get admin data
*/
export const getAdminData = async (token) => {
  try {
    const response = await axios.get('/api/admin/get-admin-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

/* 
 desc: Update logged in admin profile
*/
export const updateLoggedInAdminData = async (token, newData, dispatch) => {
  try {
    const response = await axios.put(
      '/api/admin/update-logged-in-admin-data',
      { ...newData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(loginSuccess(response.data));
    return {
      ...response.data,
      isError: false,
    };
  } catch (error) {
    return {
      ...error.response.data,
      isError: true,
    };
  }
};
