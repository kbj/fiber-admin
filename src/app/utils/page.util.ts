import { PageModel } from '@shared/models/response.model'

class PageUtil {
  createEmptyPageModel(): PageModel<any> {
    return { current: 0, pages: 0, pageSize: 0, records: [], total: 0 }
  }
}

export default new PageUtil()
