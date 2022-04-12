import axios from 'axios';

/* 
 desc: ADD NEW RECORDER
*/
export const addNewRecorder = async (token, data) => {
  try {
    const response = await axios.post(
      '/api/admin/register',
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

/* 
 desc: GET ALL RECORDERS
*/
export const getAllRecorders = async (token) => {
  try {
    const response = await axios.get('/api/admin/get-all-recorders', {
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
 desc: GET A PARTICULAR RECORDER DATA BY ID
*/
export const getRecorderDataById = async (token, id) => {
  try {
    const response = await axios.get(`/api/admin/get-recorder-data/?id=${id}`, {
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
 desc: UPDATE A PARTICULAR RECORDER'S STATUS TO ACTIVE OR INACTIVE BY ID
*/
export const updateRecorderStatusToActiveOrInactiveById = async (
  token,
  id,
  status
) => {
  try {
    const response = await axios.put(
      `/api/admin/update-recorder-data/?id=${id}&updateJustStatus=true`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

/* 
 desc: UPDATE A PARTICULAR RECORDER'S DATA BY ID
*/
export const updateRecorderDataById = async (token, id, newData) => {
  try {
    const response = await axios.put(
      `/api/admin/update-recorder-data/?id=${id}&updateJustStatus='false'`,
      { ...newData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

/* 
 desc: DELETE A PARTICULAR RECORDER BY ID
*/
export const deleteRecorderById = async (token, id) => {
  try {
    const response = await axios.delete(
      `/api/admin/delete-recorder/?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};
