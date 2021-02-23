import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: [
    './vertical-menu.component.scss',
    '../../../../theme/buttons.scss',
    '../../../../theme/noselect.scss'
  ]
})
export class VerticalMenuComponent implements OnInit, OnDestroy {
  isVisibleProjectsButton = true;
  isVisibleMapButton = false;
  subscription!: SubscriptionLike;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (!e.url.includes('/projects')) {
          this.isVisibleProjectsButton = true;
          this.isVisibleMapButton = false;
        } else {
          this.isVisibleProjectsButton = false;
          this.isVisibleMapButton = true;
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
