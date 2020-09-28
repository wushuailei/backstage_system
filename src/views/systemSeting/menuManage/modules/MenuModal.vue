<template>
  <div id='menu-modal'>
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
                :has-feedback="true"
                label='菜单名称'
                prop='componentName'
            >
              <a-input :disabled="disableds.componentName" v-model='ruleForm.componentName' autocomplete='off' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
                :labelCol='{ span: 8 }'
                :wrapperCol='{ span: 14 }'
                :has-feedback="true"
                label='资源编码'
                prop='resCoding'
            >
              <a-input :disabled="disableds.resCoding" v-model='ruleForm.resCoding' autocomplete='off' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
                :labelCol='{ span: 8 }'
                :wrapperCol='{ span: 14 }'
                :has-feedback="true"
                label='URL路径'
                prop='componentUrl'
            >
              <a-input v-model='ruleForm.componentUrl' autocomplete='off' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
                :labelCol='{ span: 8 }'
                :wrapperCol='{ span: 14 }'
                :has-feedback="true"
                label='组件路径'
                prop='component'
            >
              <a-input v-model='ruleForm.component' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
                :labelCol='{ span: 8 }'
                :wrapperCol='{ span: 14 }'
                :has-feedback="true"
                label='排序'
                prop='sortNo'
            >
              <a-input-number :min="1" :max="99"  style="width:220px" v-model.number='ruleForm.sortNo' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
                :labelCol='{ span: 8 }'
                :wrapperCol='{ span: 14 }'
                :has-feedback="true"
                label='重定向地址'
                prop='redirect'
            >
              <a-input v-model='ruleForm.redirect' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
                :labelCol='{ span: 8 }'
                :wrapperCol='{ span: 14 }'
                :has-feedback="true"
                label='组件级别'
                prop='level'
            >
              <a-input :disabled="disableds.levelDisabled" v-model='ruleForm.level' />
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
                :labelCol='{ span: 8 }'
                :wrapperCol='{ span: 14 }'
                :has-feedback="true"
                label='是否缓存组件'
                prop='keepalive'
            >
              <a-select v-model="ruleForm.keepalive">
                <a-select-option :value="1">是</a-select-option>
                <a-select-option :value="0">否</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='12'>
            <a-form-model-item
                :labelCol='{ span: 8 }'
                :wrapperCol='{ span: 14 }'
                :has-feedback="true"
                label='是否隐藏菜单'
                prop='hidden'
            >
              <a-select v-model="ruleForm.hidden">
                <a-select-option :value="1">是</a-select-option>
                <a-select-option :value="0">否</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Regular from '@/utils/Regular';
import CommonFn from '@/utils/CommonFn';
import MenuApi from '@/api/base/menu';

@Component({
  components: {},
})
export default class MenuModal extends Vue {
  public Regular: any = new Regular();
  public CommonFn: any = new CommonFn(this);
  // 弹窗标题
  public title: string = '新增';
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
    levelDisabled: true,
  };
  // 表单绑定值
  public ruleForm: any = {
    componentName: '',
    resCoding: '',
    componentUrl: '',
    component: '',
    sortNo: '',
    redirect: '',
    level: 1,
    keepalive: 0,
    hidden: 0,
    componentParentId: 0,
  };
  // 表单检验组
  public rules: any = {
    componentName: [{ required: true, message: '请输入菜单名称' }],
    resCoding: [{ required: true, message: '请输入资源编码' }],
    componentUrl: [{ required: true, message: '请输入URL路径' }],
    component: [{ required: true, message: '请输入组件路径' }],
    level: [{ required: true, message: '请输入组件级别' }],
    keepalive: [{ required: true, message: '请选择是否缓存组件' }],
    hidden: [{ required: true, message: '请选择是否隐藏菜单' }],
    sortNo: [{ required: true, message: '请输入组件顺序' }],
  };
  private MenuApi: any = new MenuApi();

  // 显示弹窗
  public showModal(isAdd: boolean, option: any = {}): void {
    const { title, record } = option;
    this.isAdd = isAdd;
    this.ruleForm = !isAdd ? { ...record } : this.CommonFn.clearObjVal(this.ruleForm);
    if (!isAdd) {
      this.ruleForm = { ...record };
    } else {
      this.ruleForm = {
        ...this.CommonFn.clearObjVal(this.ruleForm),
        level: record.level ? record.level + 1 : 1,
        componentParentId: record.id ? record.id : 0,
        keepalive: 0,
        hidden: 0,
      };
    }
    this.title = title;
    this.visible = true;
  }
  // 确认提交
  public handleSubmit(): void {
    this.form = this.$refs.ruleForm;
    this.form.validate((valid: any) => {
      if (valid) {
        if (this.isAdd) {
          this.MenuApi.addMenu(this.ruleForm).then((res: any) => {
            this.CommonFn.openNotificationWithIcon('success', '新增成功!', res.msg);
            // this.$emit('onAddMenuSuccess');
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
