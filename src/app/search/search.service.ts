import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  toggleSidenav$$ = new Subject();
  openSideNav$ = this.toggleSidenav$$.pipe(
    scan((acc) => !acc, false),
    startWith(false)
  );

  activeEntityFilter$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  activeLabelFilter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  resetActiveEntityFilter() {
    this.activeEntityFilter$.next(0);
  }
}
