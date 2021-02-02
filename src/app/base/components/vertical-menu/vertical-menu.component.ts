import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss', '../../../../theme/buttons.scss']
})
export class VerticalMenuComponent implements OnInit, OnDestroy {
  public isVisibleVerticalButton = true;

  subscription!: SubscriptionLike;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url.includes('/home')) {
          this.isVisibleVerticalButton = true;
        } else {
          this.isVisibleVerticalButton = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
