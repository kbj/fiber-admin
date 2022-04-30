import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core'
import { PageModel } from '@shared/models/response.model'
import { CommonTableKeyValueModel } from '@shared/models/common-table.model'
import { TableService } from '@services/common/table.service'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.less'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableListComponent implements OnInit, OnChanges {
  @Input() columnKeyValueMap: CommonTableKeyValueModel[] = [] // 列名称和字段的关联对应
  @Input() requestUrl: string = '' // 列表数据接口请求地址
  @Input() title: string = '查询表格' // 表格抬头名称
  @Input() commendColum: TemplateRef<NzSafeAny> | undefined // 操作栏插槽

  // 初始化请求数据
  listData: PageModel<any> = { current: 0, pages: 0, pageSize: 0, records: [], total: 0 }
  // 是否显示列表加载进度条
  loading: boolean = false

  constructor(private tableService: TableService, private cdr: ChangeDetectorRef, private datePipe: DatePipe) {}

  ngOnInit(): void {}

  /**
   * 请求接口获取列表信息
   */
  requestTableData(requestParam: NzSafeAny) {
    this.loading = true
    this.tableService
      .getTableList<NzSafeAny>(this.requestUrl, requestParam)
      .then((resp) => {
        this.listData = resp.data
      })
      .finally(() => {
        this.loading = false
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

  ngOnChanges(changes: SimpleChanges) {
    // 监听数据改变了取消加载框
  }
}
