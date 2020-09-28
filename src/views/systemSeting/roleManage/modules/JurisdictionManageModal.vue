<template>
  <div class='jurisdiction-manage-modal'>
    <a-modal
      :title='title'
      :visible='visible'
      :confirm-loading='confirmLoading'
      @ok='handleSubmit'
      @cancel='hiddenCancel'
      :maskClosable="false"
      width='800px'
    >
      <a-transfer
          :data-source="mockData"
          :target-keys="targetKeys"
          show-search
          :filter-option="filterOption"
          :locale="{
        itemUnit: '项',
        itemsUnit: '项',
        notFoundContent: '列表为空',
        searchPlaceholder: '请输入搜索内容'
      }"
          :titles="['其余用户', '角色所属用户']"
          :show-select-all="false"
          @change="handleChange"
          @search="handleSearch"
      >
        <template
            slot="children"
            slot-scope="{
          props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
          on: { itemSelectAll, itemSelect },
        }"
        >
          <a-table
              :row-selection="
            getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })
          "
              :columns="direction === 'left' ? leftTableColumns : rightTableColumns"
              :data-source="filteredItems"
              :pagination="pagination"
              size="small"
              :style="{ pointerEvents: listDisabled ? 'none' : null }"
              :custom-row="
            ({ key, disabled: itemDisabled }) => ({
              on: {
                click: () => {
                  if (itemDisabled || listDisabled) return;
                  itemSelect(key, !selectedKeys.includes(key));
                },
              },
            })
          "
          />
        </template>
      </a-transfer>
    </a-modal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import RoleApi from '@/api/base/role';
import CommonFn from '@/utils/CommonFn';
import lodash from 'lodash';

@Component({
  components: {
  },
})
export default class JurisdictionManageModal extends Vue {
  public CommonFn: any = new CommonFn(this);

  // 弹窗标题
  public title: string = '权限配置';
  // 显示控制
  public visible: boolean = false;
  // 提交状态
  public confirmLoading: boolean = false;
  // 当前选中角色
  public activeRoleId: number | null = null;

  // 模拟数据
  public mockData: any = [];
  // 右侧数据
  public targetKeys: any = [];
  // 右侧删除数据
  public targetRemoveKeys: any = [];
  // 元数据
  public resultArr: any = [];
  // 左侧表单列
  public leftTableColumns: any = [
    {
      dataIndex: 'title',
      title: '用户名',
    },
    {
      dataIndex: 'name',
      title: '昵称',
    },
  ];
  // 右侧表单列
  public rightTableColumns: any = [
    {
      dataIndex: 'title',
      title: '用户名',
    },
    {
      dataIndex: 'name',
      title: '昵称',
    },
  ];
  // 分页器配置
  public pagination: any = {
    showSizeChanger: true,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
    showQuickJumper: true,
    defaultCurrent: 1,
    size: 'small',
  };

  private RoleApi = new RoleApi();

  // 显示弹窗
  public showModal(record: any): void {
    this.activeRoleId = record.id;
    this.getDataSource(record);
    this.confirmLoading = false;
    this.visible = true;
  }
  // 确认提交
  public handleSubmit(): void {
    this.confirmLoading = true;
    if (this.targetKeys.length <= 0) {
      this.hiddenCancel();
    } else {
      const result = this.filterResult(this.activeRoleId);
      this.RoleApi.updateRoleUser(result).then((res: any) => {
        this.CommonFn.openNotificationWithIcon('success', '修改成功!', res.msg);
        this.hiddenCancel();
      });
    }
  }
  // 关闭弹窗
  public hiddenCancel(): void {
    this.activeRoleId = null;
    this.confirmLoading = false;
    this.visible = false;
  }
  // 过滤结果
  public filterResult(roleId: any): any {
    return {
      removeList: this.filterArr(this.resultArr, this.targetKeys, roleId),
      insertList: this.filterArr(this.targetKeys, this.resultArr, roleId),
    };
  }
  public filterArr(aArr: Array<string | number>, bArr: Array<string | number>, roleId: any): any {
    return aArr.map((val: string | number) => {
      if (bArr.indexOf(val) === -1) {
        return {
          roleId,
          userId: val,
        };
      }
    }).filter((val: any) => val !== null && val !== undefined);
  }
  // 穿梭框过滤
  public filterOption(inputValue: any, item: any): any {
    return item.title.indexOf(inputValue) !== -1;
  }
  // targetKeys, direction, moveKeys
  // 穿梭框change事件
  public handleChange(nextTargetKeys: any, direction: any, moveKeys: any): void {
    this.targetKeys = nextTargetKeys;
  }
  // 穿梭框search事件
  public handleSearch(): void {}

  public getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }: any): any {
    return {
      // getCheckboxProps: (item: any): any => ({ props: { disabled: disabled || item.disabled } }),
      onSelectAll(selected: any, selectedRows: any) {
        const treeSelectedKeys = selectedRows
            // .filter((item: any): any => item.disabled)
            .map(({ key }: any): any => key);
        const diffKeys = selected
            ? lodash.difference(treeSelectedKeys, selectedKeys)
            : lodash.difference(selectedKeys, treeSelectedKeys);
        itemSelectAll(diffKeys, selected);
      },
      onSelect({ key }: any, selected: any): any {
        itemSelect(key, selected);
      },
      selectedRowKeys: selectedKeys,
    };
  }

  public getDataSource(record: any): void {
    this.RoleApi.getRoleUserOrOtherUserList(record.id).then((res: any) => {
      this.mockData = res.data.otherUserList;
      this.targetKeys = res.data.roleUserList;
      this.resultArr = res.data.roleUserList;
    });
  }

  public mounted(): void {
    this.$emit('onThis', this);
  }
}
</script>
