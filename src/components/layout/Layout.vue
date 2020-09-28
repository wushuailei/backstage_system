<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header" :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <a-row>
        <a-col :span="2">
          <div class="logo" />
        </a-col>
        <a-col :span="2" :offset="18">
          <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['2']"
            :style="{ lineHeight: '64px' }"
          >
<!--            <a-menu-item key="1">nav 1</a-menu-item>-->
<!--            <a-menu-item key="2">nav 2</a-menu-item>-->
          </a-menu>
        </a-col>
        <a-col :span="1" :offset="1">
          <a-dropdown
              :trigger="['click']"
              placement="bottomRight"
              :overlayStyle="{
                paddingTop: '10px',
              }">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-avatar size="large" icon="user" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="clickLogOut">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        @collapse="clickCollapse"
        v-model="collapsed"
        collapsible
        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, marginTop:'6.5vh' }"
      >
        <side-menu :menus="menus" />
      </a-layout-sider>
      <a-layout
        :style="{ transition: '.3s all', padding: '24px', marginTop:'6.5vh', marginLeft: contentMarginLeft + 'px' }"
      >
        <l-tabs />
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0 }"
        >
          <slot name="layoutContent" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LTabs from '../tabs/LTabs.vue';
import SideMenu from '@/components/layout/modules/SideMenu.vue';

@Component({
  components: {
    LTabs,
    SideMenu,
  },
})
export default class Layout extends Vue {
  public collapsed: boolean = false;
  public contentMarginLeft: number = 200;

  public temporarySource: any = [];

  // 计算属性
  public get menus(): any {
    return this.$store.getters.menus;
  }

  public clickCollapse(collapsed: boolean, type: string): void {
    this.contentMarginLeft = !collapsed ? 200 : 80;
  }

  public clickMenuManage(routerName: string): void {
    this.$store.dispatch('AddPanes', { title: '菜单管理', key: routerName, closable: true });
    this.$store.dispatch('SetActiveKey', routerName);
    this.$router.push({ name: routerName });
  }

  public clickLogOut(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usernmae');
    this.$store.commit('setToken', null);
    this.$router.push({ path: '/login' });
  }
}
</script>

<style lang="less" scoped>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
