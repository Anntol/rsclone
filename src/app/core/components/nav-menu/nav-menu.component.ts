import {
 Component, ElementRef, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss', '../../../../theme/stacks.scss']
})
export class NavMenuComponent {
  @ViewChild('menuClose') menuClose!: ElementRef;

  onClickedOutside(): void {
    const inputElement: HTMLElement = this.menuClose.nativeElement as HTMLElement;
    inputElement.click();
  }
}
