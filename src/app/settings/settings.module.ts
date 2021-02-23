import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FavouritesListComponent } from './components/favourites-list/favourites-list.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { AuthNoticeComponent } from './components/auth-notice/auth-notice.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserInfoComponent,
    FavouritesListComponent,
    DeleteItemComponent,
    AuthNoticeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class SettingsModule { }
