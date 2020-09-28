<template>
  <div id="l-tabs">
    <a-tabs :activeKey="activeKey" :hide-add="true" type="editable-card" @change="changeTabs" @edit="onEdit" :tabBarStyle="{margin: 0}">
      <a-tab-pane
        v-for="item in panes"
        :key="item.key"
        :tab="item.title"
        :closable="item.closable"
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuApi from '../../api/base/menu';

@Component({
  components: {},
})
export default class LTabs extends Vue {
  private MenuApi = new MenuApi();

  // 计算属性
  public get activeKey(): any {
    return this.$store.getters.activeKey;
  }
  public get oldActiveKey(): any {
    return this.$store.getters.oldActiveKey;
  }
  public get panes(): any {
    return this.$store.getters.panes;
  }

  public onEdit(targetKey: any): void {
    if (targetKey === this.activeKey) {
      this.$router.push({ name: this.oldActiveKey });
    }
    this.$store.dispatch('RemovePanes', targetKey);
  }

  public changeTabs(activeKey: any): void {
    this.$router.push({ name: activeKey });
  }

  public created(): void {
    this.$store.dispatch('QueryMenus');
  }

}
</script>

<style lang="less" scoped>
</style>
