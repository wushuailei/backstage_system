const RESET_PANES = (state: any) => {
    state.panes = state.panes.map((val: any, index: number, arr: any) => {
        return {
            ...val,
            closable: arr.length > 1,
        };
    }).filter((val: any, index: number, arr: any) => {
        return val.key !== null;
    });
};

const app = {
    state: {
        activeKey: 'Home',
        oldActiveKey: '/',
        panes: [],
    },
    mutations: {
        SET_ACTIVE_KEY(state: any, activeKey: string | number): void {
            state.activeKey = activeKey;
        },
        SET_OLD_ACTIVE_KEY(state: any, oldActiveKey: string | number): void {
            state.oldActiveKey = oldActiveKey;
        },
        ADD_PANES(state: any, pane: any): void {
            state.panes.push(pane);
            RESET_PANES(state);
        },
        REMOVE_PANES(state: any, key: string | number): void {
            const i = state.panes.findIndex((e: any) => e.key === key);
            state.panes.splice(i, 1);
            RESET_PANES(state);
        },
    },
    actions: {
        SetOldActiveKey({ commit }: any, oldActive: string | number): void {
          commit('SET_OLD_ACTIVE_KEY', oldActive);
        },
        SetActiveKey({ commit }: any, activeKey: any): void {
            commit('SET_ACTIVE_KEY', activeKey);
        },
        AddPanes({ commit }: any, pane: any): void {
            commit('ADD_PANES', pane);
        },
        RemovePanes({ commit }: any, key: string | number): void {
            commit('REMOVE_PANES', key);
        },
    },
};

export default app;
