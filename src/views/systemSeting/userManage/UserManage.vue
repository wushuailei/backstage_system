<template>
  <div id='user-manage'>
    <!-- 按钮组 -->
    <a-row id="user-manage-btn-list">
      <a-col :span="4">
        <a-button @click="clickAddUser" type="primary">新增</a-button>
      </a-col>
    </a-row>
    <!-- 用户管理表格 -->
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
          <a-col :span='6' :offset='6'>
            <a href='javascript:;' @click='clickEditUser(record)'>编辑</a>
          </a-col>
          <a-col :span='6'>
            <a href='javascript:;' @click='clickDeleteUser(record)'>删除</a>
          </a-col>
        </a-row>
      </template>
    </a-table>

    <!-- 用户新增or编辑弹窗 -->
    <user-modal ref="userModal" @onThis="onThis" @onSubmitSuccess="onSubmitSuccess" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import UserModal from './modules/UserModal.vue';
import UserApi from '@/api/base/user';
import CommonFn from '@/utils/CommonFn';

@Component({
  components: {
    UserModal,
  },
})
export default class MenuManage extends Vue {
  // 加载中
  public loading: boolean = false;
  // 表格表头信息
  public columns: any = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: '20%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'username' },
    },
    {
      title: '昵称',
      dataIndex: 'name',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: '电话',
      dataIndex: 'tel',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'tel' },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'email' },
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: '20%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'address' },
    },
    {
      title: '头像',
      dataIndex: 'portrait',
      width: '10%',
      ellipsis: true,
      align: 'center',
      scopedSlots: { customRender: 'portrait' },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: '10%',
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
    showQuickJumper: true,
    defaultCurrent: 1,
    size: 'small',
  };
  // 弹窗实例
  public UserModal: any = '';

  private CommonFn: any = new CommonFn(this);
  private UserApi = new UserApi();

  // 新增用户
  public clickAddUser(): void {
    this.$nextTick(() => {
      this.UserModal.showModal(true, { title: '新增' });
    });
  }
  // 编辑用户
  public clickEditUser(record: any): void {
    this.$nextTick(() => {
      this.UserModal.showModal(false, { record, title: '编辑' });
    });
  }
  // 删除用户
  public clickDeleteUser(record: any): void {
    const thin = this;
    this.$confirm({
      title: '确认删除该用户吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        thin.UserApi.deleteUser({ id: record.id, username: record.username }).then((res: any) => {
          thin.CommonFn.openNotificationWithIcon('success', '删除成功!', res.msg);
          thin.getDataSource();
        });
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  public onThis(thin: any): void {
    this.UserModal = thin;
  }
  public onSubmitSuccess(): void {
    this.getDataSource();
  }

  public getDataSource(): void {
    this.loading = true;
    this.UserApi.getUserList().then((res: any) => {
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
#user-manage {
  #user-manage-btn-list {
    margin-bottom: 1vh;
  }
}
</style>
