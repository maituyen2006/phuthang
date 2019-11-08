import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsInsertComponent } from './transactions-insert.component';

describe('TransactionsInsertComponent', () => {
  let component: TransactionsInsertComponent;
  let fixture: ComponentFixture<TransactionsInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
