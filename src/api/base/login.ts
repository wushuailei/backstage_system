import axios from 'axios';

class LoginApi {
    /**
     * @function login 登录
     * @params { username: string, password: string }
     */
    public login(params: any) {
        return axios({
            url: '/user/signIn',
            method: 'post',
            data: params,
        });
    }

    /**
     * @function register 注册
     * @param { Object } params { name: string, username: string, password: string }
     */
    public register(params: object) {
        return axios({
            url: '/user/register',
            method: 'post',
            data: params,
        });
    }
}

export default LoginApi;
