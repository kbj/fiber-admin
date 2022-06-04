import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { AddEditFormModel } from '@shared/models/common.model'
import validateUtils from '@utils/validate.util'

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
    } else if (config.validatorOrOpts === Validators.required) {
      return true
    }

    try {
      const validatorOrOpts = config.validatorOrOpts as ValidatorFn[]
      return validatorOrOpts.indexOf(Validators.required) > -1
    } catch (e) {}
    return false
  }

  submit() {
    validateUtils.validateFormAllFields(this.formGroup.controls)
  }

  /**
   * 根据control内部的value值获取对应的中文名
   */
  getControlLabelName(control: FormControl) {
    const name = Object.keys(control['_parent'].value)[0]
    const config = this.formConfig.filter((config) => config.name === name)
    return config && config[0] ? config[0].label : name
  }
}
