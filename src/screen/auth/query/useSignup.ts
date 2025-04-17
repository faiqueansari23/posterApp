import {useDispatch} from 'react-redux';
import client from '../../../../utils/ApiClient';
import {login} from '../../../../redux/auth/authSlice';
import API_URLS from '../../../../utils/endPoints';
import Toast from 'react-native-toast-message';
import { ISignup } from './useSignupForm';

// export interface ISignupRequest {
//     name: string;
//     phone: string;
//     password: string;
//     agent_shop: string;
// }

export interface ISignupResponse {
    message: string
    data: Data
  }
  
  export interface Data {
    name: string
    phone: string
    agent_shop: string
    password: string
    updated_at: string
    created_at: string
    id: number
  }

const useAdminLogin = () => {
  const dispatch = useDispatch();
  const tryLogin = async (values: ISignup) => {
    try {
      const url = `${API_URLS.USER_LOGIN}`;
      const response: ILoginResponse = await client.post(url, values);
      // console.log('checkDecode1', JSON.stringify(response, null, 2));
      if (response?.statusCode === 200) {
        Toast.show({
          type: 'success',
          text1: 'Login Successfully',
          visibilityTime: 2500,
        });
        dispatch(
          login({
            userInfo: response?.data,
            isLoggedIn: true,
            token: '',
          }),
        );
      }

      return response;
    } catch (res: any) {
      if (res?.statusCode === 403) {
        dispatch(
          login({
            userInfo: res?.data,
            isLoggedIn: false,
            token: '',
          }),
        );
      }
      Toast.show({
        type: 'error',
        text1: res?.message,
        visibilityTime: 25000,
      });
      return res;
    }
  };

  const tryLogoutAllDeviceById = async (id: number): Promise<boolean> => {
    try {
      const url = `${API_URLS.LOGOUT_ALL}`;
      const response: ILoginResponse = await client.post(`${url}/${id}`);
      if (response?.statusCode === 200) {
        Toast.show({
          type: 'success',
          text1: 'Logout Successfully',
          visibilityTime: 2000,
        });
        return true;
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        visibilityTime: 25000,
      });
      return false;
    }
    return true;
  };

  return {
    tryLogin,
    tryLogoutAllDeviceById,
  };
};

export {useAdminLogin};
