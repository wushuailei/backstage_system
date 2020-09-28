import Vue from 'vue';
import router from './router';
import store from './store';
import Encryption from '@/utils/Encryption';

const encrypt = new Encryption();

router.beforeEach((to: any, from: any, next: any) => {
    const token = store.getters.token || sessionStorage.getItem('token');
    const userinfo = sessionStorage.getItem('userinfo');
    store.dispatch('SetToken', token);
    if (userinfo !== null) {
        store.dispatch('SetUserinfo', JSON.parse(encrypt.base64Decrypt(userinfo)));
    }
    if (!token && to.name !== 'Login') {
        next('/login');
    }
    store.dispatch('SetOldActiveKey', from.name);
    store.dispatch('SetActiveKey', to.name);
    if (to.name !== 'Login' && store.getters.panes.findIndex((e: any) => e.key === to.name) === -1) {
        store.dispatch('AddPanes', { title: to.meta.title, key: to.name, closable: store.getters.panes.length >= 1 });
    }
    next();
});
