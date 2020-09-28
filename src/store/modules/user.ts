const user = {
    state: {
        token: '',
        userinfo: null,
    },
    mutations: {
        SET_TOKEN(state: any, token: string): void {
            state.token = token;
        },
        SET_USERINFO(state: any, userinfo: any): void {
            state.userinfo = userinfo;
        },
    },
    actions: {
        SetToken({ commit }: any, token: string): void {
            commit('SET_TOKEN', token);
        },
        SetUserinfo({ commit }: any, userinfo: any): void {
            commit('SET_USERINFO', userinfo);
        },
    },
};

export default user;
