import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Game } from '../models/game.model';
import { Jackpot } from '../models/jackpot.model';

@Injectable()
export class GamesService {
  domain = environment.apiUrl;
  jackpots = new BehaviorSubject<Jackpot[]>([]);
  allGames = new BehaviorSubject<Game[]>([]);
  games = new BehaviorSubject<Game[]>([]);

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<Game[]>(`${this.domain}/front-end-test/games.php`, {responseType: 'json'}).pipe(
      map(data => {
        this.allGames.next(data);
        return data;
      })
    );
  }

  getJackpots() {
    return this.http.get<Jackpot[]>(`${this.domain}/front-end-test/jackpots.php`, {responseType: 'json'}).pipe(
      map(data => {
        const allGames = this.allGames.value;
        data.forEach((x: Jackpot) => {
          const indx = allGames.findIndex(y => y.id === x.game);
          if (indx >= 0) {
            allGames[indx].jackpot = x.amount;
          }
        });
        this.allGames.next(allGames);
        this.jackpots.next(data);
        return data;
      })
    );
  }

  getGamesByCategory(cur: string) {
    const allGames = this.allGames.value;
    const games = allGames.filter(game => {
      if (game.categories.includes(cur)) {
        return true;
      }
      if (cur === 'other' && 
        ( game.categories.includes('ball') || 
          game.categories.includes('virtal') || 
          game.categories.includes('fun')
        )) {
        return true;
      }
      if (cur === 'jackpots' && game.jackpot) {
        return true;
      }
      return false
    });
    this.games.next(games);
  }
}