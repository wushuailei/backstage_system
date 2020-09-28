import axios from 'axios';

class UserApi {
    /**
     * @function getUserinfo 获取登录用户信息
     * @param username 用户名
     */
    public getUserinfo(username: string) {
        return axios({
            url: '/user/userinfo',
            method: 'GET',
            params: {
                username,
            },
        });
    }
    /**
     * @function getUserList 获取用户列表
     */
    public getUserList(): any {
        return axios({
            url: '/user/userList',
            method: 'GET',
        });
    }

    /**
     * @function updateUserinfo 更新用户信息
     * @param { Object } params 参数
     */
    public updateUserinfo(params: object): any {
        return axios({
            url: '/user/updateUserinfo',
            method: 'POST',
            data: params,
        });
    }

    /**
     * @function addUser 新建用户
     * @param { Object } params 参数
     */
    public addUser(params: object): any {
        return axios({
            url: '/user/addUser',
            method: 'POST',
            data: params,
        });
    }

    /**
     * @function deleteUser 删除用户
     * @param { Object } params 参数
     */
    public deleteUser(params: object): any {
        return axios({
            url: '/user/deleteUser',
            method: 'GET',
            params,
        });
    }
}

export default UserApi;
