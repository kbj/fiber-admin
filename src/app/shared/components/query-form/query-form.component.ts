import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { CommonBreakPoints, CommonTableSearchFormModel } from '@shared/models/common.model'
import { WindowService } from '@services/common/window.service'
import { takeUntil } from 'rxjs'
import { DestroyService } from '@services/common/destroy.service'
import Constant from '@core/config/constant.config'
import { NzSafeAny } from 'ng-zorro-antd/core/types'

/**
 * 通用列表搜索表单组件
 */
@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.less'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryFormComponent implements OnInit, AfterViewInit {
  constructor(private fb: FormBuilder, private windowService: WindowService, private destroy: DestroyService) {}

  @Input() formConfig: CommonTableSearchFormModel[] = [] // 搜索表单配置信息
  @Input() loading: boolean = false // 是否处于加载状态（用与动画等展示）
  @Output() searchOnClick = new EventEmitter<NzSafeAny>() // 搜索按钮的点击事件

  /**
   * 列表抬头搜索表单
   */
  queryForm: FormGroup = this.fb.group({})

  /**
   * 是否显示展开与收起
   */
  isCollapse: boolean = true

  /**
   * 当前栅格的状态
   */
  currentBreakPoint = this.windowService.currentBreakPoint.getValue()

  /**
   * 列表查询表单中不需要展开的表单项数目
   */
  notCollapseItemNumber = Constant.NOT_COLLAPSE_ITEM_NUMBER

  /**
   * 计算搜索工具栏偏移栅格数
   */
  get searchAreaOffset() {
    let items = this.formConfig.length + 1
    if (items > this.notCollapseItemNumber + 1 && this.isCollapse) {
      items = this.notCollapseItemNumber + 1
    }
    switch (this.currentBreakPoint) {
      case CommonBreakPoints.Xs:
        // 一个表单项一行，不需要偏移
        return null
      case CommonBreakPoints.Sm:
        // 两个表单项一行
        return items % 2 === 0 ? null : (2 - (items % 2)) * 12
      case CommonBreakPoints.Md:
      case CommonBreakPoints.Lg:
        // 三个表单项一行
        return items % 3 === 0 ? null : (3 - (items % 3)) * 8
      case CommonBreakPoints.Xl:
      case CommonBreakPoints.Xxl:
        // 四个表单项一行
        return items % 4 === 0 ? null : (4 - (items % 4)) * 6
    }
  }

  ngOnInit(): void {
    // 初始化表单
    this.initForm()

    // 监听栅格状态
    this.windowService.currentBreakPoint
      .asObservable()
      .pipe(takeUntil(this.destroy))
      .subscribe((current) => (this.currentBreakPoint = current))
  }

  ngAfterViewInit(): void {
    this.search()
  }

  /**
   * 初始化表单
   */
  initForm() {
    this.formConfig.forEach((config) => {
      this.queryForm.addControl(config.value, new FormControl(null))
    })
  }

  /**
   * 搜索按钮点击事件
   */
  search() {
    this.searchOnClick.emit(this.queryForm.value)
  }

  /**
   * 重置表单
   */
  reset() {
    this.queryForm.reset()
    this.search()
  }
}
