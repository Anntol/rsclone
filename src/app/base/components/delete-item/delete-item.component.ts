import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent {
  @Output() delClick = new EventEmitter();

  onDeleteClick(): void {
    this.delClick.emit();
  }
}
