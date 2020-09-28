<template>
  <div id="menu-manage-modal">
    <a-modal
        :title='title'
        :visible='visible'
        :confirm-loading='confirmLoading'
        @ok='handleSubmit'
        @cancel='hiddenCancel'
        :maskClosable="false"
        width='800px'
    >
      <a-tree
        v-model="checkedKeys"
        :checkable="true"
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @check="onCheck"
        @expand="onExpand"
        @select="onSelect"
      />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuApi from '@/api/base/menu';
import RoleApi from '@/api/base/role';
import CommonFn from '@/utils/CommonFn';

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

@Component({
  components: {},
})
export default class MenuManageModal extends Vue {
  public CommonFn: any = new CommonFn(this);
  // 弹窗
  public title: string = '菜单管理';
  public visible: boolean = false;
  public confirmLoading: boolean = false;
  // 树
  // （受控）选中复选框的树节点
  public checkedKeys: any = [];
  // （受控）展开指定的树节点
  public expandedKeys: string[] | number[] = [];
  // （受控）是否展开父节点
  public autoExpandParent: boolean = false;
  // （受控）选中的节点
  public selectedKeys: string[] | number[] = [];
  // 树数据
  public treeData: any = [];
  // 元数据
  public resultArr: any = [];
  // 当前选中的角色
  public activeRoleId: any = null;

  private MenuApi: any = new MenuApi();
  private RoleApi: any = new RoleApi();

  // 弹窗 fn
  public showModal(record: any): void {
    this.activeRoleId = record.id;
    this.getDataSource(record.id);
    this.visible = true;
  }
  public handleSubmit(): void {
    this.confirmLoading = true;
    const result = this.filterResult(this.activeRoleId);
    this.RoleApi.updateRoleMenu(result).then((res: any) => {
      this.CommonFn.openNotificationWithIcon('success', '修改成功!', res.msg);
      this.hiddenCancel();
    });
  }
  public hiddenCancel(): void {
    this.confirmLoading = false;
    this.visible = false;
  }
  public filterResult(roleId: any): any {
    return {
      insertList: this.filterArr(this.checkedKeys, this.resultArr, roleId),
      removeList: this.filterArr(this.resultArr, this.checkedKeys, roleId),
    };
  }
  public filterArr(aArr: Array<string | number>, bArr: Array<string | number>, roleId: any): any {
    return aArr.map((val: string | number) => {
      if (bArr.indexOf(val) === -1) {
        return {
          roleId,
          menuId: val,
        };
      }
    }).filter((val: any) => val !== null && val !== undefined);
  }

  // 树 fn
  public onExpand(expandedKeys: any): void {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }
  public onSelect(selectedKeys: any): void {
    // this.selectedKeys = selectedKeys;
  }
  public onCheck(checkedKeys: any): void {
    this.checkedKeys = checkedKeys;
  }

  public getDataSource(roleId: number): void {
    this.MenuApi.getMenus(roleId).then((res: any) => {
      this.treeData = res.data.menuList;
      this.checkedKeys = res.data.checkedKeys;
      this.resultArr = res.data.checkedKeys;
    });
  }

  public mounted(): void {
    this.$emit('onThis', this);
  }
}
</script>
