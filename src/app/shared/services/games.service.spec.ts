import { TestBed } from '@angular/core/testing';
import { GamesService } from 'src/app/shared/services/games.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Game } from '../models/game.model';
import { environment } from 'src/environments/environment';
import { Jackpot } from '../models/jackpot.model';
import { take } from 'rxjs';

describe('GamesService', () => {
  let service: GamesService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GamesService,
      ],
    });
    service = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct domain', () => {
    expect(service.domain).toEqual('https://stage.whgstage.com');
  });

  it('be able to retrieve games from the API via GET', () => {
    const dummyGames: Game[] = [
      {
        categories: ['top'],
        id: '1',
        image: 'http://example.com',
        name: 'test',
      }
    ];
    service.getGames().subscribe(games => {
      expect(games.length).toBe(1);
      expect(games).toEqual(dummyGames);
    });
    const request = httpMock.expectOne( `${environment.apiUrl}/front-end-test/games.php`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyGames);
  });

  it('be able to retrieve jackpots from the API via GET', () => {
    const dummyJackpots: Jackpot[] = [
      {
        game: 'test',
        amount: 12323321
      }
    ];
    service.getJackpots().subscribe(jackpots => {
      expect(jackpots.length).toBe(1);
      expect(jackpots).toEqual(dummyJackpots);
    });
    const request = httpMock.expectOne( `${environment.apiUrl}/front-end-test/jackpots.php`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyJackpots);
  });

  it('get correct games array when filter with getGamesByCategory function', () => {
    const dummyGames: Game[] = [
      {
        categories: ['new', 'top'],
        id: '1',
        image: 'http://example.com',
        name: 'test',
      },
      {
        categories: ['top'],
        id: '1',
        image: 'http://example.com',
        name: 'test',
      },
      {
        categories: ['slots'],
        id: '1',
        image: 'http://example.com',
        name: 'test',
      }
    ];
    service.getGames().subscribe(() => {
      service.getGamesByCategory('top');
      service.games.pipe(take(1)).subscribe(data => {
        expect(data.length).toBe(2);
      })

      service.getGamesByCategory('slots');
      service.games.pipe(take(1)).subscribe(data => {
        expect(data.length).toBe(1);
      })
    });
    const request = httpMock.expectOne( `${environment.apiUrl}/front-end-test/games.php`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyGames);
  });
});