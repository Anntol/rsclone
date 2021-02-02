import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private preloaderSubject = new BehaviorSubject<boolean>(true);

  isLoading$ = this.preloaderSubject.asObservable();

  show(): void {
    this.preloaderSubject.next(true);
  }

  hide(): void {
    this.preloaderSubject.next(false);
  }
}
