import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { ThemesListComponent } from '../../components/themes-list/themes-list.component';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit {
  content!: any;

  page!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.page = params.page;
    });
    console.log(this.page);
    switch (this.page) {
      case 'projects':
        this.content = ThemesListComponent
        break
      // case 'map':
      //   this.content = DetailsType2Component
      //   break
      case 'login':
        this.content = AuthPageComponent
        break
        case 'signup':
        this.content = AuthPageComponent
        break
      case 'settings':
        this.content = UserProfileComponent
        break
      default:
        this.content = ThemesListComponent
    }
  }
}
