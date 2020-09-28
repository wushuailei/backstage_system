<template>
  <div id='user-modal'>
    <a-modal
      :title='title'
      :visible='visible'
      :confirm-loading='confirmLoading'
      @ok='handleSubmit'
      @cancel='hiddenCancel'
      :maskClosable="false"
      width='800px'
    >
      <a-form-model ref='ruleForm' :model='ruleForm' :rules='rules' >
        <a-row>
          <a-col :span='12'>
            <a-form-model-item
              :labelCol='{ span: 8 }'
              :wrapperCol='{ span: 14 }'
              label='用户名'
              prop='username'
            >
              <a-input :disabled="disableds.username" v-model='ruleForm.username' autocomplete='off' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
              :labelCol='{ span: 8 }'
              :wrapperCol='{ span: 14 }'
              has-feedback
              label='昵称'
              prop='name'
            >
              <a-input v-model='ruleForm.name' autocomplete='off' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
              :labelCol='{ span: 8 }'
              :wrapperCol='{ span: 14 }'
              has-feedback
              label='电话'
              prop='tel'
            >
              <a-input v-model.number='ruleForm.tel' autocomplete='off' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
              :labelCol='{ span: 8 }'
              :wrapperCol='{ span: 14 }'
              has-feedback
              label='邮箱'
              prop='email'
            >
              <a-input v-model.number='ruleForm.email' autocomplete='off' />
            </a-form-model-item>
          </a-col>
          <a-col :span='24'>
            <a-form-model-item
              :labelCol='{ span: 4 }'
              :wrapperCol='{ span: 18 }'
              has-feedback
              label='地址'
              prop='address'
            >
              <a-input style="width:598px" v-model.number='ruleForm.address' autocomplete='off' />
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
import UserApi from '@/api/base/user';

@Component({
  components: {},
})
export default class UserModal extends Vue {
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
    username: false,
  };
  // 表单绑定值
  public ruleForm: any = {
    username: '',
    name: '',
    tel: '',
    email: '',
    address: '',
  };
  // 表单检验组
  public rules: any = {
    username: [{ required: true, pattern: this.Regular.emailRegular, message: '请输入正确账号格式', trigger: 'change' }],
    name: [{ trigger: 'change' }],
    tel: [{ pattern: this.Regular.phoneRegular, message: '请输入正确电话号码格式', trigger: 'change' }],
    email: [{ pattern: this.Regular.emailRegular, message: '请输入正确邮箱格式', trigger: 'change' }],
    address: [{ trigger: 'change' }],
  };

  private UserApi = new UserApi();

  // 显示弹窗
  public showModal(isAdd: boolean, option: any = {}): void {
    const { title, record } = option;
    this.isAdd = isAdd;
    this.ruleForm = !isAdd ? {...record} : this.CommonFn.clearObjVal(this.ruleForm);
    this.disableds.username = !isAdd;
    this.title = title;
    this.visible = true;
  }
  // 确认提交
  public handleSubmit(): void {
    // this.confirmLoading = true;
    this.form = this.$refs.ruleForm;
    this.form.validate((valid: any) => {
      if (valid) {
        if (this.isAdd) {
          this.UserApi.addUser(this.ruleForm).then((res: any) => {
            this.CommonFn.openNotificationWithIcon('success', '新建成功!', res.msg);
            this.onSubmitSuccess();
            this.hiddenCancel();
          });
        } else {
          this.UserApi.updateUserinfo(this.ruleForm).then((res: any) => {
            this.CommonFn.openNotificationWithIcon('success', '修改成功!', res.msg);
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
