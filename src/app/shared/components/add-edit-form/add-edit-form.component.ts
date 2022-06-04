import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AddEditFormModel } from '@shared/models/common.model'
import validateUtils from '@utils/validate.util'
import { MAX_LENGTH, REQUIRED } from '@shared/components/add-edit-form/form-validators-error-code'

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  /**
   * 可见性
   */
  @Input() nzVisible: boolean = false
  @Output() nzVisibleChange = new EventEmitter<boolean>()

  /**
   * 传入的表单配置信息与值
   */
  @Input() formConfig: AddEditFormModel[] = []
  @Input() formValue: { [key: string]: any } = {}

  /**
   * 表单对象
   */
  formGroup: FormGroup = this.fb.group({})

  ngOnInit(): void {
    // 初始化表单
    this.formConfig.forEach((config) => {
      this.formGroup.addControl(
        config.name,
        new FormControl(config.value, config.validatorOrOpts, config.asyncValidator)
      )
    })
  }

  /**
   * 判断该条目是否显示必填
   */
  checkRequired(config: AddEditFormModel): boolean {
    if (!config || !config.validatorOrOpts) {
      return false
    }

    return config.validatorOrOpts.indexOf(Validators.required) > -1
  }

  submit() {
    validateUtils.validateFormAllFields(this.formGroup.controls)
  }

  /**
   * 动态封装表单校验以及错误提示语
   */
  getControlErrorMessage(control: FormControl): string | undefined {
    if (!control || control.status !== 'INVALID' || !control.errors) {
      return undefined
    }
    const name = Object.keys(control['_parent'].value)[0]
    const config = this.formConfig.filter((config) => config.name === name)[0]

    const key = Object.keys(control.errors)
    if (!key) {
      return undefined
    }

    // 如果有传入错误提示信息
    if (config.errorMessage && config.errorMessage[key[0]]) {
      return config.errorMessage[key[0]]
    }

    // todo:没有传入信息，走默认提示（只包含常见错误，后续有再陆续完善）
    switch (key[0]) {
      case REQUIRED:
        return `${config.label}不能为空`
      case MAX_LENGTH:
        return `${config.label}长度不能超过${control.errors[MAX_LENGTH]['requiredLength']}，当前长度为：${control.errors[MAX_LENGTH]['actualLength']}`
    }
    return undefined
  }
}
