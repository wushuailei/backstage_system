import axios from 'axios';

class MenuApi {
    /**
     * @function getMenus 获取菜单列表
     * @param { Number | null } roleId 角色ID
     */
    public getMenus(roleId: number | null = null): any {
        const params = roleId ? { roleId } : {};
        return axios({
            url: '/api/menus',
            method: 'GET',
            params,
        });
    }
    /**
     * @function getMenus 获取该用户下全部菜单
     */
    public getRoleMenus(): any {
        return axios({
            url: '/api/menu/roleMenus',
            method: 'GET',
        });
    }
    /**
     * @function getMenus 新建菜单
     * @param { Object } params 参数
     */
    public addMenu(params: object): any {
        return axios({
            url: '/api/menu/addMenu',
            method: 'POST',
            data: params,
        });
    }
}

export default MenuApi;
