import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core'
import { PageModel } from '@shared/models/response.model'
import { CommonTableKeyValueModel } from '@shared/models/common.model'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { DatePipe } from '@angular/common'
import { NzTableSize } from 'ng-zorro-antd/table/src/table.types'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import pageUtil from '@utils/page.util'

interface CacheColumnConfig {
  name: string
  checked: boolean
  source: CommonTableKeyValueModel
  fixed?: 'left' | 'right'
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.less'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableListComponent implements OnInit, OnChanges {
  constructor(private cdr: ChangeDetectorRef, private datePipe: DatePipe) {}

  @Input() columnKeyValueMap: CommonTableKeyValueModel[] = [] // 列名称和字段的关联对应
  @Input() title: string = '查询表格' // 表格抬头名称
  @Input() lists: PageModel<NzSafeAny> = pageUtil.createEmptyPageModel() // 列表所需展示的数据
  @Input() toolbarTemplate: TemplateRef<NzSafeAny> | null = null // 工具栏自定义插槽
  @Input() commendTemplate: TemplateRef<NzSafeAny> | null = null // 操作栏插槽
  @Input() loading: boolean = false // 加载状态
  @Input() loadingDelay = 100 // 加载动画延迟，防止闪烁
  @Input() showCheckboxColum: boolean = true // 是否展示选择列
  @Input() showMultiDeleteBtn: boolean = true // 是否展示批量删除按钮
  @Output() multiDeleteBtnClick = new EventEmitter<number[]>() // 批量删除按钮点击后发出的事件
  @Output() refreshBtnClick = new EventEmitter() // 刷新按钮点击后发出的事件

  /**
   * 列表密度筛选列表
   */
  tableSizeProps: { name: string; value: NzTableSize; selected: boolean }[] = [
    { name: '默认', selected: true, value: 'default' },
    { name: '中等', selected: false, value: 'middle' },
    { name: '紧凑', selected: false, value: 'small' }
  ]

  /**
   * 全选框是否处于半选择状态
   */
  allCheckedIndeterminate = false

  /**
   * checkbox是否是全选
   */
  allChecked = false

  /**
   * 缓存每条记录的选中状态
   */
  listsCheckedMap: Map<number, boolean> = new Map<number, boolean>()

  /**
   * 缓存输入的列顺序结构，用于列设置里面更改
   */
  cacheColumnKeyValue: CacheColumnConfig[] = []

  /**
   * 列设置列选择框是否处于半选择状态
   */
  allColumnCheckedIndeterminate = false

  ngOnInit(): void {
    this.resetColumnSetting()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lists']) {
      // 监听列表数据改变
      this.initTableListsCheckedData()
    }
  }

  /**
   * 获取列表密度值
   */
  get tableSize() {
    const selectItems = this.tableSizeProps.filter((item) => item.selected)
    if (selectItems && selectItems.length > 0) {
      return selectItems[0].value
    }
    return 'default'
  }

  /**
   * 选择列选中的ID数组
   */
  get checkedIds() {
    const checked: number[] = []
    this.listsCheckedMap.forEach((value, key) => {
      if (value) {
        checked.push(key)
      }
    })
    return checked
  }

  /**
   * 列设置列选中状态
   */
  get allColumnChecked() {
    let check = 0
    let notCheck = 0
    this.cacheColumnKeyValue.forEach((value) => {
      if (!value.checked) {
        notCheck++
      } else {
        check++
      }
    })
    if (check === 0 && notCheck === 0) {
      this.allColumnCheckedIndeterminate = false
      return false
    } else if (check > 0 && notCheck > 0) {
      this.allColumnCheckedIndeterminate = true
      return false
    } else {
      this.allColumnCheckedIndeterminate = false
      return check > 0
    }
  }

  /**
   * 获取列表列的数据
   * @param item
   * @param data
   */
  getColumnValue(item: CommonTableKeyValueModel, data: any) {
    switch (item.type) {
      case 'date':
        // 日期类型的列表数据
        return this.datePipe.transform(data[item.value as string], item.format)
      case 'string':
      default:
        return data[item.value as string]
    }
  }

  /**
   * 刷新按钮方法
   */
  refresh() {
    this.refreshBtnClick.emit()
  }

  /**
   * 更改列表密度
   */
  changeTableSize(value: NzTableSize) {
    this.tableSizeProps.forEach((item) => (item.selected = item.value === value))
  }

  /**
   * 多选checkbox选中回调
   */
  allCheckedChange(checked: boolean) {
    this.allChecked = checked
    this.checkedIds.length = 0
    this.listsCheckedMap.forEach((value, id) => {
      this.listsCheckedMap.set(id, checked)
    })
  }

  /**
   * 单独数据行的checkbox回调
   */
  itemCheckedChange(checked: boolean, id: number) {
    this.listsCheckedMap.set(id, checked)

    // 检查全部的数据，更改标题的全选的状态
    let check = 0
    let notCheck = 0
    this.listsCheckedMap.forEach((value) => {
      if (value) {
        check++
      } else {
        notCheck++
      }
    })
    if (check === 0) {
      this.allChecked = false
      this.allCheckedIndeterminate = false
    } else if (check > 0 && notCheck > 0) {
      this.allChecked = false
      this.allCheckedIndeterminate = true
    } else {
      this.allChecked = true
      this.allCheckedIndeterminate = false
    }
  }

  /**
   * 控制每列的展示隐藏
   */
  changeColumnHide(checked: boolean, item: CacheColumnConfig) {
    item.checked = checked
  }

  /**
   * 初始化列表单选框选中状态
   */
  initTableListsCheckedData() {
    this.listsCheckedMap.clear()
    this.lists.records.forEach((item) => this.listsCheckedMap.set(item.id, false))
    this.allCheckedIndeterminate = false
  }

  /**
   * 列顺序位置调整拖拽回调
   */
  dropTableListChange(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cacheColumnKeyValue, event.previousIndex, event.currentIndex)
  }

  /**
   * 列设置中所有列展示checkbox回调
   */
  allColumnCheckedChange(checked: boolean) {
    this.allColumnCheckedIndeterminate = false
    this.cacheColumnKeyValue.forEach((item) => {
      item.checked = checked
    })
  }

  /**
   * 重置列设置
   */
  resetColumnSetting() {
    this.cacheColumnKeyValue.length = 0
    this.columnKeyValueMap.forEach((item) => {
      this.cacheColumnKeyValue.push({ name: item.name, checked: !item.hide, fixed: item.fixed, source: item })
    })
  }

  /**
   * 固定列
   * @param item  要固定的列条目
   * @param index 当前条目的索引值
   * @param direction 固定的方向
   */
  fixed(item: CacheColumnConfig, index: number, direction: 'left' | 'right') {
    if (item.fixed === direction) {
      item.fixed = undefined
      return
    }

    // 添加固定列，并移动到对应位置上
    let targetIndex = index
    switch (direction) {
      case 'left':
        // 找到第一个非固定的列的索引值
        for (let i = 0; i < this.cacheColumnKeyValue.length; i++) {
          if (!this.cacheColumnKeyValue[i].fixed) {
            targetIndex = i
            break
          }
        }
        break
      case 'right':
        // 找到最后一个非固定的列的索引值
        for (let i = this.cacheColumnKeyValue.length - 1; i >= 0; i--) {
          if (!this.cacheColumnKeyValue[i].fixed) {
            targetIndex = i
            break
          }
        }
        break
    }
    if (index != targetIndex) {
      moveItemInArray(this.cacheColumnKeyValue, index, targetIndex)
    }
    item.fixed = direction
  }
}
