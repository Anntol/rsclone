import { Component } from '@angular/core';
import { PreloaderService } from '../../../core/service/preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent {
  active!: boolean;

  constructor(public preloader: PreloaderService) {
    preloader.loading$
    .subscribe((status: boolean) => {
      this.active = status
    });
   }
}
