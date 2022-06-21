import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent {
  @Input() data: any;

  isNew() {
    return this.data.categories.includes('new');
  }
}
