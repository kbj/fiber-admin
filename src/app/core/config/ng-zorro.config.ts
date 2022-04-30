import { NzConfig } from 'ng-zorro-antd/core/config'

export const ngZorroConfig: NzConfig = {
  // 消息提示的全局配置
  message: {
    nzMaxStack: 5 // 同一时间可展示的最大提示数量
  },
  // 表格
  table: {
    nzBordered: true, // 展示外边框和列边框
    nzShowQuickJumper: true, // 是否可以快速跳转至某页
    nzShowSizeChanger: true // 是否可以改变 nzPageSize
  }
}
