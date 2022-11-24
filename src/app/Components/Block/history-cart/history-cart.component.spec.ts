import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCartComponent } from './history-cart.component';

describe('HistoryCartComponent', () => {
  let component: HistoryCartComponent;
  let fixture: ComponentFixture<HistoryCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
