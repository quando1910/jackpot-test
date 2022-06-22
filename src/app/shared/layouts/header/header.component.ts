import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  categories: Category[] = [
    {
      name: 'top games' ,
      key: 'top'
    },
    {
      name: 'new games' ,
      key: 'new'
    },
    {
      name: 'slots' ,
      key: 'slots'
    },
    {
      name: 'jackpots' ,
      key: 'jackpots'
    },
    {
      name: 'live' ,
      key: 'live'
    },
    {
      name: 'blackjack' ,
      key: 'blackjack'
    },
    {
      name: 'roulette' ,
      key: 'roulette'
    },
    {
      name: 'table' ,
      key: 'table'
    },
    {
      name: 'poker' ,
      key: 'poker'
    },
    {
      name: 'other' ,
      key: 'other'
    }
  ];
  activeCategoryKey: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.pipe(filter((x) => !!x && Object.keys(x).length > 0)).subscribe(params => {
      this.activeCategoryKey = params['category'] ?? 'top'; 
    });
  }

  changeCategory(key: string) {
    const queryParams: Params = { category: key };

    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge',
      });
    }
}
