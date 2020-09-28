<template>
  <a-menu theme="dark" mode="vertical">
    <template v-for="menu in menus">
      <a-menu-item @click="clickMenuManage({ resCoding: 'Home', title: '首页' })">
        <a-icon type="home" />
        <span>首页</span>
      </a-menu-item>
      <a-menu-item v-if="!menu.children" :key="menu.key">
        <a-icon type="pie-chart" />
        <span>{{ menu.title }}</span>
      </a-menu-item>
      <a-sub-menu v-if="!menu.hidden && menu.children.length > 0" :key="menu.key">
        <span slot="title">
          <a-icon :type="menu.icon" />
          <span>{{ menu.componentName }}</span>
        </span>
        <template v-for="menuChild2 in menu.children">
          <a-sub-menu v-if="!menuChild2.hidden && menuChild2.children.length > 0" :key="menuChild2.key">
            <span slot="title">
              <span>{{ menuChild2.componentName }}</span>
            </span>
            <template v-for="menuChild3 in menuChild2.children">
              <a-sub-menu v-if="!menuChild3.hidden && menuChild3.children.length > 0" :key="menuChild3.key">
                <span slot="title">
                  <span>{{ menuChild3.componentName }}</span>
                </span>
              </a-sub-menu>
              <a-menu-item @click="clickMenuManage(menuChild3)" v-if="!menuChild3.hidden && menuChild3.children.length <= 0" :key="menuChild3.key">
                {{ menuChild3.componentName }}
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item @click="clickMenuManage(menuChild2)" v-if="!menuChild2.hidden && menuChild2.children.length <= 0" :key="menuChild2.key">
            {{ menuChild2.componentName }}
          </a-menu-item>
        </template>
      </a-sub-menu>
      <a-menu-item @click="clickMenuManage(menu)" v-if="!menu.hidden && menu.children.length <= 0" :key="menu.key">
        {{ menu.componentName }}
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
// import { Menu } from 'ant-design-vue';
//
// const SubMenu = {
//   template: `
//       <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
//         <span :slot="menuInfo.icon">
//           <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
//         </span>
//         <template v-for="item in menuInfo.children">
//           <a-menu-item v-if="!item.children" :key="item.key" v-on:click="clickMenuManage(item)">
//             <a-icon :type="item.icon" />
//             <span>{{ item.title }}</span>
//           </a-menu-item>
//           <sub-menu v-else :key="item.key" :menu-info="item" />
//         </template>
//       </a-sub-menu>
//     `,
//   name: 'SubMenu',
//   // must add isSubMenu: true
//   isSubMenu: true,
//   props: {
//     ...Menu.SubMenu.props,
//     // Cannot overlap with properties within Menu.SubMenu.props
//     menuInfo: {
//       type: Object,
//       default: () => ({}),
//     },
//   },
// };

@Component({
  components: {
    // 'sub-menu': SubMenu,
  },
})
export default class SideMenu extends Vue {

  public get activeKey(): any {
    return this.$store.getters.activeKey;
  }

  @Prop()
    public menus!: any;

  public clickMenuManage(record: any): void {
    if (this.activeKey !== record.resCoding) {
      this.$router.push({ name: record.resCoding });
    }
  }
}
</script>
