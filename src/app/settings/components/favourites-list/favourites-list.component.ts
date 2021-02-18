import {
 Component, Input, Output, EventEmitter
} from '@angular/core';
import { IFavourite } from '../../models/favourite.model';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: [
    './favourites-list.component.scss',
    './favourites-list-media.scss'
  ]
})
export class FavouritesListComponent {
  @Input() isUserAuthenticated!: boolean;

  @Input() userFavourites!: IFavourite[];

  @Output() favouritesDel: EventEmitter<number> = new EventEmitter<number>();

  onDeleteFavourite(projectId: number): void {
    this.favouritesDel.emit(projectId);
  }
}
