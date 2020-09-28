import Vue from 'vue';
import utilCommonFn from '@/utils/CommonFn';
// 系统错误捕获
const errorHandler = (error: any, vm: any) => {

  const CommonFn = new utilCommonFn(vm);
  CommonFn.openNotificationWithIcon('warning', '警告', error);
  // tslint:disable-next-line:no-console
  console.error('抛出全局异常');
  // tslint:disable-next-line:no-console
  // console.error(vm);
  // tslint:disable-next-line:no-console
  console.error(error);
};

Vue.config.errorHandler = errorHandler;

Vue.prototype.$throw = function(error: any): void {
    errorHandler(error, this);
};
