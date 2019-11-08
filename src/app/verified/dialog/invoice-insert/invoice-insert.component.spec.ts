import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInsertComponent } from './invoice-insert.component';

describe('InvoiceInsertComponent', () => {
  let component: InvoiceInsertComponent;
  let fixture: ComponentFixture<InvoiceInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
