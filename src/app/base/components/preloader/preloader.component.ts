import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PreloaderService } from '../../../core/service/preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent {
  active!: Observable<boolean>;

  constructor(public preloader: PreloaderService) {
    preloader.isLoading$
    .subscribe((status: boolean) => {
      this.active = of(status);
    });
   }
}
