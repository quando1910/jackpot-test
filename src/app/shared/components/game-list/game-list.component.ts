import { Component } from '@angular/core';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  games: any[] = [];
  intervalHandle: any = null;
  subscription: Subscription = new Subscription();
  constructor(
    private gamesSv: GamesService
  ) {}

  ngOnInit() {
    this.subscription = forkJoin([
      this.gamesSv.getGames(),
      this.gamesSv.getJackpots()
    ]).subscribe(() => {
      combineLatest([
        this.gamesSv.currentCategory,
        this.gamesSv.jackpots
      ]).subscribe(data => {
        this.gamesSv.currentCategory.subscribe(cur => {
          this.games = this.gamesSv.getGamesByCategory(cur);
        });
      });
      this.intervalHandle = setInterval(() => {
        this.gamesSv.getJackpots().subscribe(() => {});
      }, 20 * 1000);
    });
  }
  ngOnDestroy() {
    clearInterval(this.intervalHandle);
    this.subscription.unsubscribe();
  }
}
