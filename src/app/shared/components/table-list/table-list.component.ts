import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { PageModel } from '@models/response.model'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableListComponent implements OnInit, OnChanges {
  @Input() headerName: string[] = [] // 列名称
  @Input() listData: PageModel<any> = { current: 0, pages: 0, pageSize: 0, records: [], total: 0 } // 接口请求数据
  @Input() loading: boolean = false // 是否显示列表加载进度条

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    // 监听数据改变了取消加载框
    if (changes['listData']) {
      // this.loading = false
    }
  }
}
