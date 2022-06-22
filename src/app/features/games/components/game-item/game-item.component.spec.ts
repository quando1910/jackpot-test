import { CommonModule } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { GameItemComponent } from './game-item.component';

describe('GameItemComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
      ],
      declarations: [
        GameItemComponent,
      ]
    }).compileComponents();
  });

  it('should create the game item component', () => {
    const fixture = TestBed.createComponent(GameItemComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should reflect correct UI with specific data', () => {
    const fixture = TestBed.createComponent(GameItemComponent);
    const component = fixture.componentInstance;
    const mockGameItem = {
      categories: ['top', 'new'],
      id: '1',
      image: 'http://example.com',
      name: 'test',
      jackpot: 123
    };
    component.data = mockGameItem;
    component.ngOnChanges({
      data: new SimpleChange(null, mockGameItem, true)
    });
    fixture.detectChanges();
  
    const $name = fixture.debugElement.query(By.css('.game-name'));
    expect($name.nativeElement.innerText).toEqual(mockGameItem.name);

    const $jackpot = fixture.debugElement.query(By.css('.jackpot-amount'));
    expect($jackpot.nativeElement.innerText).toBeTruthy();

    const $label = fixture.debugElement.query(By.css('.new-label'));
    expect($label).toBeTruthy();
  });
  
});
