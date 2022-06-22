import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, forkJoin, interval, Subscription, take } from 'rxjs';
import { Game } from 'src/app/shared/models/game.model';
import { GamesService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  subscription: Subscription = new Subscription();
  games = new BehaviorSubject<Game[]>([]);

  constructor(
    private route: ActivatedRoute,
    private gamesSv: GamesService
  ) {
  }

  ngOnInit() {
    this.games = this.gamesSv.games;
    forkJoin([
      this.gamesSv.getGames(),
      this.gamesSv.getJackpots()
    ])
      .pipe(take(1))
      .subscribe(() => {
        this.subscription.add(
          combineLatest([
            this.route.queryParams,
            this.gamesSv.jackpots
          ]).subscribe(data => {
            const cur = data[0]['category'] ?? 'top';
            this.gamesSv.getGamesByCategory(cur);
          })
        );
        const refreshJackpots = interval(20 * 1000);
        this.subscription.add(
          refreshJackpots.subscribe(() => {
            this.gamesSv.getJackpots().subscribe(() => {});
          })
        );
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
