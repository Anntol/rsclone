import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapComponent } from './components/map/map.component';
import { SharedModule } from '../shared/shared.module';
import { MarkerService } from './services/marker.service';

@NgModule({
  declarations: [
    MapPageComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MapPageComponent
  ],
  providers: [
    MarkerService
  ],
})
export class MapModule { }
