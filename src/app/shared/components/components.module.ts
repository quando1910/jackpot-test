import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameItemComponent } from './game-item/game-item.component';
import { GameListComponent } from './game-list/game-list.component';

@NgModule({
  declarations: [
    GameItemComponent,
    GameListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [GameItemComponent, GameListComponent]
})
export class ComponentsModule { }
