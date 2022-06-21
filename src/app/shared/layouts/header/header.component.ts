import { Component } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  categories = [
    {
      name: 'top games' ,
      key: 'top'
    },
    {
      name: 'new games' ,
      key: 'new'
    },
    {
      name: 'slots' ,
      key: 'slots'
    },
    {
      name: 'jackpots' ,
      key: 'jackpots'
    },
    {
      name: 'live' ,
      key: 'live'
    },
    {
      name: 'blackjack' ,
      key: 'blackjack'
    },
    {
      name: 'roulette' ,
      key: 'roulette'
    },
    {
      name: 'table' ,
      key: 'table'
    },
    {
      name: 'poker' ,
      key: 'poker'
    },
    {
      name: 'other' ,
      key: 'other'
    }
  ];
  activeCategoryKey = 'top';

  constructor(
    private gamesSv: GamesService
  ) {}

  changeCategory(key: string) {
    this.activeCategoryKey = key;
    this.gamesSv.currentCategory.next(key);
  }
}
