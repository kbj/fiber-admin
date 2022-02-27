import {AbstractControl} from "@angular/forms";

class ValidateUtil {
  /**
   * 手动触发form表单中的所有校验
   */
  validateFormAllFields(controls: { [p: string]: AbstractControl }) {
    for (let i in controls) {
      controls[i].markAsDirty()
      controls[i].updateValueAndValidity()
    }
  }
}

export default new ValidateUtil()
