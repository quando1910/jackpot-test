import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { LayoutsModule } from './layouts/layouts.module';
import { GamesService } from './services/games.service';

@NgModule({

  imports: [
    CommonModule,
    LayoutsModule,
    ComponentsModule
  ],
  exports: [
    LayoutsModule,
    ComponentsModule
  ],
  providers: [
    GamesService
  ]
})
export class SharedModule { }
