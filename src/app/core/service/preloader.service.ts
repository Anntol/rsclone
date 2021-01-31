import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private preloaderSubject = new BehaviorSubject<boolean>(true);

  loading$ = this.preloaderSubject.asObservable();

  show(): void {
    console.log('[SHOW]');
    this.preloaderSubject.next(true);
  }

  hide(): void {
    console.log('[HIDE]');
    this.preloaderSubject.next(false);
  }
}
