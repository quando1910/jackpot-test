import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutsModule } from './layouts/layouts.module';
import { GamesService } from './services/games.service';

@NgModule({

  imports: [
    CommonModule,
    LayoutsModule,
  ],
  exports: [
    LayoutsModule,
  ],
  providers: [
    GamesService
  ]
})
export class SharedModule { }
