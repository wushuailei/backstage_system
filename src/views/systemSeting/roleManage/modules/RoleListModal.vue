<template>
  <div id='role-list-modal'>
    <a-modal
      :title='title'
      :visible='visible'
      :confirm-loading='confirmLoading'
      @ok='handleSubmit'
      @cancel='hiddenCancel'
      :maskClosable="false"
      width='800px'
    >
      <a-form-model ref='ruleForm' :model='ruleForm' :rules='rules'>
        <a-row>
          <a-col :span='12'>
            <a-form-model-item
              :labelCol='{ span: 8 }'
              :wrapperCol='{ span: 14 }'
              has-feedback
              label='角色名称'
              prop='roleName'
            >
              <a-input
                v-model='ruleForm.roleName'
                autocomplete='off'
              />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
              :labelCol='{ span: 8 }'
              :wrapperCol='{ span: 14 }'
              has-feedback
              label='角色编号'
              prop='roleCode'
            >
              <a-input v-model='ruleForm.roleCode' autocomplete='off' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
              :labelCol='{ span: 8 }'
              :wrapperCol='{ span: 14 }'
              has-feedback
              label='备注'
              prop='remarkes'
            >
              <a-input v-model.number='ruleForm.remarkes' />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Regular from '../../../../utils/Regular';
import CommonFn from '../../../../utils/CommonFn';
import RoleApi from '@/api/base/role';

@Component({
  components: {},
})
export default class RoleListModal extends Vue {
  public Regular: any = new Regular();
  public CommonFn: any = new CommonFn(this);
  // 弹窗标题
  public title: string = 'title';
  // 显示控制
  public visible: boolean = false;
  // 提交状态
  public confirmLoading: boolean = false;
  // 是否新增
  public isAdd: boolean = true;
  // 表单
  public form: any = '';
  // 表单禁用控制
  public disableds: any = {
  };
  // 表单绑定值
  public ruleForm: any = {
    roleName: '',
    roleCode: '',
    remarkes: '',
  };
  // 表单检验组
  public rules: any = {
    roleName: [{ required: true, trigger: 'change' }],
    roleCode: [{ required: true, trigger: 'change' }],
  };

  private RoleApi = new RoleApi();

  // 显示弹窗
  public showModal(isAdd: boolean, option: any = {}): void {
    const { title, record } = option;
    this.isAdd = isAdd;
    this.ruleForm = !isAdd
      ? { ...record }
      : this.CommonFn.clearObjVal(this.ruleForm);
    this.title = title;
    this.visible = true;
  }
  // 确认提交
  public handleSubmit(): void {
    this.confirmLoading = true;
    this.form = this.$refs.ruleForm;
    this.form.validate((valid: any) => {
      if (valid) {
        if (this.isAdd) {
          this.RoleApi.addRole(this.ruleForm).then((res: any) => {
            this.CommonFn.openNotificationWithIcon('success', '新增成功!', res.msg);
            this.onSubmitSuccess();
            this.hiddenCancel();
          });
        }
      } else {
        return false;
      }
    });
  }
  public onSubmitSuccess(): void {
    this.$emit('onSubmitSuccess');
  }
  // 关闭弹窗
  public hiddenCancel(): void {
    this.confirmLoading = false;
    this.visible = false;
  }
  public mounted(): void {
    this.$emit('onThis', this);
  }
}
</script>
