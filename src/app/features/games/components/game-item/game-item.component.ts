import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnChanges {
  @Input() data!: Game;
  ribbonText: string = '';

  ngOnChanges(simple: SimpleChanges) {
    if (simple && simple['data'].currentValue) {
      if (this.data.categories.includes('new')) {
        this.ribbonText = 'NEW'
      } else if (this.data.categories.includes('top')) {
        this.ribbonText = 'TOP'
      }
    }
  }
}
