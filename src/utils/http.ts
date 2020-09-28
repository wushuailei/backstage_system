import axios from 'axios';
import router from '@/router/index';
import store from '@/store/index';
import { notification } from 'ant-design-vue';
import { config } from 'vue/types/umd';

// 通知提醒框配置
notification.config({
    placement: 'bottomRight',
    duration: 3,
});

// 开发环境、测试环境和生产环境
// 根据node的环境变量匹配默认的接口url前缀
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:80/';
} else if (process.env.NODE_ENV === 'debug') {
    axios.defaults.baseURL = 'http://10.17.62.177:80/';
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://10.17.62.177:80/';
}

// 设置超时
axios.defaults.timeout = 10000;

// 设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    (configs) => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.getters.token || sessionStorage.getItem('token');
        const usernmae = store.getters.usernmae || sessionStorage.getItem('username');
        if (token) {
            configs.headers.Authorization = token;
        }
        return configs;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200 && response.data.status === 200) {
            return Promise.resolve(response.data);
        } else {
            if (response.status === 200) {
                switch (response.data.status) {
                    case 400:
                        notification.error({
                            message: '请求失败',
                            description: response.data.msg,
                        });
                        break;
                    // 401: 未登录
                    // 未登录则跳转登录页面，并携带当前页面的路径
                    // 在登录成功后返回当前页面，这一步需要在登录页操作。
                    case 401:
                        router.replace({
                            path: '/login',
                        });
                        break;

                    // 403 token过期
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面
                    case 403:
                        // 清除token
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('usernmae');
                        store.commit('setToken', null);
                        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                        router.replace({
                            path: '/login',
                        });
                        break;

                    // 404请求不存在
                    case 404:
                        break;
                    // 其他错误，直接抛出错误提示
                    default:
                        break;
                }
            }
            return Promise.reject(response.data);
        }
    },
    (error) => {
        return Promise.reject(error);
    },
);
