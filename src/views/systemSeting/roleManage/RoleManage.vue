<template>
  <div id="role-manage">
    <!-- 按钮组 -->
    <a-row id="role-manage-btn-list">
      <a-col :span="4">
        <a-button @click="clickAddUser" type="primary">新增</a-button>
      </a-col>
    </a-row>
    <!-- 角色管理表格 -->
    <a-table :loading="loading" :columns='columns' :data-source='dataSource' bordered :pagination="pagination">
      <template v-for='col in columns' :slot='col.dataIndex' slot-scope='text'>
        <a-tooltip placement='top' :key='col.dataIndex'>
          <template slot='title'>
            <span>{{ text }}</span>
          </template>
          <div>{{ text }}</div>
        </a-tooltip>
      </template>
      <template slot='operation' slot-scope='text, record'>
        <a-row>
          <a-col :span='6'>
            <a href="javascript:" @click='clickEditRole(record)'>编辑</a>
          </a-col>
          <a-col :span='6'>
            <a href="javascript:" @click='clickJurisdictionRole(record)'>用户管理</a>
          </a-col>
          <a-col :span='6'>
            <a href="javascript:" @click='clickMenuManage(record)'>菜单管理</a>
          </a-col>
          <a-col :span='6'>
            <a href="javascript:" @click='clickDeleteRole(record)'>删除</a>
          </a-col>
        </a-row>
      </template>
    </a-table>

    <!-- 角色新增or编辑弹窗 -->
    <role-list-modal ref="RoleListModal" @onThis="onRoleListModalThis" @onSubmitSuccess="onSubmitSuccess" />
    <!-- 权限配置弹窗 -->
    <jurisdiction-manage-modal ref="JurisdictionManageModal" @onThis="onJurisdictionManageModalThis" />
    <!-- 菜单管理弹窗 -->
    <menu-manage-modal ref="MenuManageModal" @onThis="onMenuManageModalThis" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuManageModal from './modules/MenuManageModal.vue';
import RoleListModal from './modules/RoleListModal.vue';
import JurisdictionManageModal from './modules/JurisdictionManageModal.vue';
import RoleApi from '@/api/base/role';

@Component({
  components: {
    RoleListModal,
    JurisdictionManageModal,
    MenuManageModal,
  },
})
export default class RoleManage extends Vue {
  // 加载中
  public loading: boolean = false;
  // 表格表头信息
  public columns: any = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      width: '20%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'roleName' },
    },
    {
      title: '角色编号',
      dataIndex: 'roleCode',
      width: '20%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'roleCode' },
    },
    {
      title: '备注',
      dataIndex: 'remarkes',
      width: '20%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'remarkes' },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: '20%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'createdTime' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  // 表格数据
  public dataSource: any = [];
  // 分页器配置
  public pagination: any = {
    showTotal: (total: number | string) => {
      return `共有${total}条数据`;
    },
    showSizeChanger: true,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
    showQuickJumper: true, defaultCurrent: 1, size: 'small',
  };
  // 角色新增or编辑弹窗实例
  public RoleListModal: any = '';
  // 权限配置弹窗实例
  public JurisdictionManageModal: any = '';
  // 菜单管理弹窗实例
  public MenuManageModal: any = '';

  private RoleApi = new RoleApi();

    // 新增角色
  public clickAddUser(): void {
    this.$nextTick(() => {
      this.RoleListModal.showModal(true, { title: '新增' });
    });
  }
  // 编辑角色
  public clickEditRole(record: any): void {
    this.$nextTick(() => {
      this.RoleListModal.showModal(false, { record, title: '编辑' });
    });
  }
  // 删除角色
  public clickDeleteRole(record: any): void {
      this.$confirm({
        title: '确认删除该角色吗?',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          // console.log('OK');
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
  }
  // 菜单配置
  public clickMenuManage(record: any): void {
    this.$nextTick(() => {
      this.MenuManageModal.showModal(record);
    });
  }
  // 用户配置
  public clickJurisdictionRole(record: any): void {
    this.$nextTick(() => {
      this.JurisdictionManageModal.showModal(record);
    });
  }
  public onSubmitSuccess(): void {
    this.getDataSource();
  }
  public onRoleListModalThis(thin: any): void {
    this.RoleListModal = thin;
  }
  public onJurisdictionManageModalThis(thin: any): void {
    this.JurisdictionManageModal = thin;
  }
  public onMenuManageModalThis(thin: any): void {
    this.MenuManageModal = thin;
  }

  public getDataSource(): void {
    this.loading = true;
    this.RoleApi.getRoles().then((res: any) => {
      this.dataSource = res.data;
      this.loading = false;
    });
  }
  public created(): void {
    this.getDataSource();
  }
}
</script>

<style lang="less" scoped>
#role-manage {
  #role-manage-btn-list {
    margin-bottom: 1vh;
  }
}
</style>
