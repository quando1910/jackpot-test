import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GamesRoutingModule } from './games.routing';
import { GameItemComponent } from './components/game-item/game-item.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [
    GamesComponent,
    GameItemComponent,
    GameListComponent,
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ],
})
export class GamesModule { }
