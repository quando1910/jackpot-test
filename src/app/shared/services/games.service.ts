import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map } from 'rxjs';

@Injectable()
export class GamesService {
  domain = environment.apiUrl;
  currentCategory = new BehaviorSubject<string>('top');
  jackpots = new BehaviorSubject<any[]>([]);
  allGames: any[] = [];

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get(`${this.domain}/front-end-test/games.php`, {responseType: 'json'}).pipe(
      map((data: any) => {
        this.allGames = data;
        return data;
      })
    );
  }

  getJackpots() {
    return this.http.get(`${this.domain}/front-end-test/jackpots.php`, {responseType: 'json'}).pipe(
      map((data: any) => {
        this.jackpots.next(data);
        data.forEach((x: any) => {
          const indx = this.allGames.findIndex(y => y.id === x.game);
          if (indx >= 0) {
            this.allGames[indx].jackpot = x.amount;
          }
        });
        return data;
      })
    );
  }

  getGamesByCategory(cur: string) {
    return this.allGames.filter(game => {
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
      return false
    });
  }
}