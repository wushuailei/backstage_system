<template>
  <div id="menu-magage">
    <header class="mg-bt15">
      <a-row>
        <a-col :span="4">
          <a-button type="primary" @click="clickAddLevel1Menu">新增</a-button>
        </a-col>
      </a-row>
    </header>
    <main>
      <!-- 菜单管理表格 -->
      <a-table
          :columns="columns"
          :data-source="dataSource"
          bordered
          :loading="loading"
          :pagination="false"
          :row-selection="rowSelection"
      >
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
            <a-col :span='6' :offset='3'>
              <a href='javascript:;' @click='clickEditDetail(record)'>编辑详情</a>
            </a-col>
            <a-col :span='6'>
              <a href='javascript:;' @click='clickAddChildren(record)'>新增子项</a>
            </a-col>
            <a-col :span='6'>
              <a href='javascript:;' @click='clickDeleteMenu(record)'>删除(包含子项)</a>
            </a-col>
          </a-row>
        </template>
      </a-table>
    </main>
    <!-- 新增or编辑弹窗 -->
    <menu-modal ref="MenuModal" @onThis="onThis" @onSubmitSuccess="onSubmitSuccess" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuModal from './modules/MenuModal.vue';
import CommonFn from '@/utils/CommonFn';
import MenuApi from '@/api/base/menu';

@Component({
  components: {
    MenuModal,
  },
})
export default class MenuManage extends Vue {
  // 加载中
  public loading: boolean = false;
  // 表格表头信息
  public columns: any = [
    {
      title: '菜单名称',
      dataIndex: 'componentName',
      align: 'center',
      width: '10%',
      ellipsis: true,
    },
    {
      title: '资源编码',
      dataIndex: 'resCoding',
      align: 'center',
      width: '10%',
      ellipsis: true,
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      align: 'center',
      width: '20%',
      ellipsis: true,
      scopedSlots: { customRender: 'component' },
    },
    {
      title: 'URL路径',
      dataIndex: 'componentUrl',
      align: 'center',
      width: '20%',
      ellipsis: true,
      scopedSlots: { customRender: 'componentUrl' },
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
      align: 'center',
      width: '5%',
      ellipsis: true,
      scopedSlots: { customRender: 'sortNo' },
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
  // 弹窗实例
  public MenuModal: any = '';

  private CommonFn: CommonFn = new CommonFn(this);
  private MenuApi: MenuApi = new MenuApi();

  // 编辑按钮样式
  public editStyle(edit: string): string {
    return 'color: #1890ff;cursor: pointer;';
  }
  // 计算属性
  public get rowSelection(): any {
    return {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record: any) => ({
        props: {
          disabled: false,
        },
      }),
    };
  }
  // 点击新增一级菜单
  public clickAddLevel1Menu(): void {
    this.$nextTick(() => {
      this.MenuModal.showModal(true, { title: '新增', record: {} });
    });
  }
  // 点击编辑事件
  public clickEditDetail(record: any): void {
    this.$nextTick(() => {
      this.MenuModal.showModal(false, { title: '编辑', record });
    });
  }
  // 点击新增子项
  public clickAddChildren(record: any): void {
    this.$nextTick(() => {
      this.MenuModal.showModal(true, { title: '新增', record });
    });
    // if (!record.id) {
    //   this.$message.warning('请先编辑完成当前路由！！！');
    // } else {
    //   const children = record.children === undefined ? [] : record.children;
    //   record.children = [...children, this.createEmptyRoute(record.level+1, record.id, children.length+1)];
    //   this.dataSource = [...this.dataSource];
    // }
  }
  // 点击删除该项(包含子项)
  public clickDeleteMenu(record: any): void {
    // this.dataSource = [ ...this.dataSource ]
    // console.log(record);
  }
  // public clFnChildren(arr: any): any {
  //   const nArr = [ ...arr ];
  //   nArr.push();
  //   return nArr;
  // }
  public createEmptyRoute(level: number, id: number, sortNo: number): any {
   return {
     key: this.CommonFn.uuid(),
     componentName: '',
     component: '',
     componentUrl: '',
     redirect: '',
     componentParentId: id,
     keepalive: 0,
     hidden: 0,
     level,
     sortNo,
   };
  }
  public lookupChildren(arr: any, k: string): any {
    for (const item of arr) {
      if (item.key === k) {
        return item;
      } else {
        if (item.children === undefined) {
          return item;
        } else {
          return this.lookupChildren(item.children, k);
        }
      }
    }
  }
  public onThis(thin: any): void {
    this.MenuModal = thin;
  }
  public onSubmitSuccess(): void {
    this.getDataSource();
    this.$store.dispatch('QueryMenus');
  }

  public getDataSource(): void {
    this.loading = true;
    this.MenuApi.getMenus().then((res: any) => {
      this.dataSource = res.data.menuList;
      this.loading = false;
    });
  }

  public created(): void {
    this.getDataSource();
  }
}
</script>
