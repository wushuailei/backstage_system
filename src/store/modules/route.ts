import router, { routes } from '@/router';
import MenuApi from '@/api/base/menu';

const api = new MenuApi();

const route = {
  state: {
    addRouters: [],
    menus: [],
  },
  mutations: {
    SET_MENUS(state: any, menus: any): void {
      state.menus = menus;
    },
    SET_ROUTERS(state: any, routerList: any): void {
      state.addRouters = routerList;
      router.addRoutes(routerList);
    },
  },
  actions: {
    QueryMenus({ commit }: any): void {
      api.getRoleMenus().then((res: any) => {
        const asyncRouters: any = [];
        filterAsyncRouter(res.data, asyncRouters);
        asyncRouters.push({ path: '*', redirect: '/404', hidden: true });
        commit('SET_ROUTERS', asyncRouters);
        commit('SET_MENUS', res.data);
      });
    },
    SetMenus({ commit }: any, menus: any): void {
      commit('SET_MENUS', menus);
    },
  },
};

const filterAsyncRouter = (routers: any, nRouters: any) => {
  for (const r of routers) {
    if (r.children && r.children.length) {
      filterAsyncRouter(r.children, nRouters);
    } else {
      nRouters.push({
        meta: {
          keepalive: r.keepalive,
          hidden: r.hidden,
          layoutShow: false,
          title: r.componentName,
        },
        component: loadView(r.component),
        path: r.componentUrl,
        name: r.resCoding,
      });
    }
  }
};

function loadView(view: string): any {
  // 路由懒加载
  return () => import(`@/views/${view}.vue`);
}

export default route;
