import { Component, Input } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  @Input() games: Game[] | null = [];
}
