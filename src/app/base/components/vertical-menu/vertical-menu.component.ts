import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss', '../../../../theme/buttons.scss']
})
export class VerticalMenuComponent implements OnInit {
  public isVisibleVerticalButton = true;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url.includes('/home')) {
          this.isVisibleVerticalButton = true;
        } else {
          this.isVisibleVerticalButton = false;
        }
      }
    });
  }
}
