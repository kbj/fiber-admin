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
import { PageModel, ResponseModel } from '@shared/models/response.model'
import { CommonTableKeyValueModel } from '@shared/models/common.model'
import { TableService } from '@services/common/table.service'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { DatePipe } from '@angular/common'
import { NzTableSize } from 'ng-zorro-antd/table/src/table.types'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.less'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableListComponent implements OnInit, OnChanges {
  constructor(private tableService: TableService, private cdr: ChangeDetectorRef, private datePipe: DatePipe) {}

  @Input() columnKeyValueMap: CommonTableKeyValueModel[] = [] // 列名称和字段的关联对应
  @Input() requestUrl: string = '' // 列表数据接口请求地址
  @Input() title: string = '查询表格' // 表格抬头名称
  @Input() commendColum: TemplateRef<NzSafeAny> | null = null // 操作栏插槽
  @Input() addForm: TemplateRef<NzSafeAny> | null = null // 新增按钮点开展示内容插槽
  @Input() editForm: TemplateRef<NzSafeAny> | null = null // 修改按钮点开展示内容插槽
  @Input() allowDelete: boolean = true // 是否允许删除
  @Input() toolbarTemplate: TemplateRef<NzSafeAny> | null = null // 工具栏自定义插槽
  @Input() loading: boolean = false // 加载状态
  @Output() loadingChange = new EventEmitter<boolean>() // 加载状态改变事件，构建双向绑定
  @Input() loadingDelay = 100 // 加载动画延迟，防止闪烁
  @Input() showCheckboxColum: boolean = true // 是否展示选择列
  @Output() deleteBtnClick = new EventEmitter<number[]>() // 批量删除按钮点击后发出的事件

  /**
   * 初始化请求数据
   */
  listData: PageModel<any> = { current: 0, pages: 0, pageSize: 0, records: [], total: 0 }

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
   * 选择列选中的ID数组
   */
  checkedIds: number[] = []

  /**
   * 缓存每次请求的参数，用于刷新按钮附带请求
   */
  private cacheFormValue: NzSafeAny = null

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    // 监听数据改变了取消加载框
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
   * 请求接口获取列表信息
   */
  requestTableData(requestParam: NzSafeAny) {
    // 加载数据promise
    const dataPromise = this.tableService.getTableList<NzSafeAny>(this.requestUrl + '/list', requestParam)

    // 为了防止加载动画闪烁，延迟loading变量更改
    const timeout = () =>
      new Promise((_, reject) => setTimeout(() => reject(Symbol.for('table-list-timeout')), this.loadingDelay))
    Promise.race([dataPromise, timeout()])
      .then((resp) => (this.listData = (resp as ResponseModel<PageModel<NzSafeAny>>).data))
      .catch((err) => {
        if (Symbol.for('table-list-timeout') === err) {
          this.loading = true
          this.loadingChange.emit(this.loading)
          return dataPromise
            .then((resp) => (this.listData = resp.data))
            .finally(() => {
              this.loading = false
              this.loadingChange.emit(this.loading)
            })
        }
        return err
      })
      .finally(() => {
        this.cacheFormValue = requestParam
        this.cdr.markForCheck()
      })
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
        return this.datePipe.transform(data[item.value], item.format)
      case 'string':
      default:
        return data[item.value]
    }
  }

  /**
   * 刷新按钮方法
   */
  refresh() {
    this.requestTableData(this.cacheFormValue)
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
    this.listData?.records.forEach((item) => {
      item._checked = checked
      if (checked) {
        this.checkedIds.push(item.id)
      }
    })
  }

  /**
   * 单独数据行的checkbox回调
   */
  itemCheckedChange(checked: boolean, data: any) {
    data._checked = checked
    this.checkedIds.length = 0

    // 检查全部的数据，更改标题的全选的状态
    let check = 0
    let notCheck = 0
    this.listData?.records.forEach((item) => {
      if (item._checked && item._checked === true) {
        check++
        this.checkedIds.push(item.id)
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
   * 删除按钮点击事件
   */
  async deleteItem(id: number[]) {
    const result = await this.tableService.deleteItems(this.requestUrl, id)
    if (result.code === 0) {
      this.refresh()
    }
  }
}
