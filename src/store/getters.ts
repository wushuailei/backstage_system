import Vue from 'vue';
const getters = {
    token: (state: any) => state.user.token,
    userinfo: (state: any) => state.user.userinfo,
    activeKey: (state: any) => state.app.activeKey,
    oldActiveKey: (state: any) => state.app.oldActiveKey,
    panes: (state: any) => state.app.panes,
    menus: (state: any) => state.route.menus,
};

export default getters;
