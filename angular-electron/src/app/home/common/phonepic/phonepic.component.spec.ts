import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonepicComponent } from './phonepic.component';

describe('PhonepicComponent', () => {
  let component: PhonepicComponent;
  let fixture: ComponentFixture<PhonepicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonepicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
