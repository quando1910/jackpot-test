import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GamesService } from 'src/app/shared/services/games.service';
import { GameItemComponent } from './components/game-item/game-item.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamesComponent } from './games.component';

describe('GamesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule
      ],
      declarations: [
        GamesComponent,
        GameItemComponent,
        GameListComponent,
      ],
      providers: [
        GamesService
      ]
    }).compileComponents();
  });

  it('should create the games component', () => {
    const fixture = TestBed.createComponent(GamesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
