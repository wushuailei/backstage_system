import axios from 'axios';

class RoleApi {
    /**
     * @function getRoles 获取角色列表
     */
    public getRoles(): any {
        return axios({
            url: '/api/roles',
            method: 'GET',
        });
    }
    /**
     * @function getUserList 获取角色下的用户列表and非角色下的用户列表
     * @param { Number } roleId 角色ID
     */
    public getRoleUserOrOtherUserList(roleId: number): any {
        return axios({
            url: '/api/role/roleUserOrOtherUserList',
            method: 'GET',
            params: {
                roleId,
            },
        });
    }
    /**
     * @function addRole 新建角色
     * @param { Object } params 参数
     */
    public addRole(params: any): any {
        return axios({
            url: '/api/roles/addRole',
            method: 'POST',
            data: params,
        });
    }
    /**
     * @function updateRoleUser 更新角色所属用户
     * @param { Object } params 参数
     */
    public updateRoleUser(params: any): any {
        return axios({
            url: '/api/role/updateRoleUser',
            method: 'POST',
            data: params,
        });
    }
    /**
     * @function updateRoleMenu 更新角色所属菜单
     * @param { Object } params 参数
     */
    public updateRoleMenu(params: any): any {
        return axios({
            url: '/api/role/updateRoleMenu',
            method: 'POST',
            data: params,
        });
    }
}

export default RoleApi;
