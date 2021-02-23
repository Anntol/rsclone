import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-quick-settings',
  templateUrl: './quick-settings.component.html',
  styleUrls: ['./quick-settings.component.scss']
})
export class QuickSettingsComponent implements OnInit {
  pathId!: string;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.pathId = e.url.slice(e.url.lastIndexOf('/') + 1)
      }
    });
  }
}
