import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameListComponent } from './game-list.component';

describe('GameListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
      ],
      declarations: [
        GameListComponent,
      ]
    }).compileComponents();
  });

  it('should create the game list component', () => {
    const fixture = TestBed.createComponent(GameListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
