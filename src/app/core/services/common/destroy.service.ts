import {Injectable, OnDestroy} from '@angular/core'
import {Subject} from 'rxjs'

/**
 * component销毁的时候，防止内存泄漏
 */
@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy(): void {
    this.next()
    this.complete()
  }
}
