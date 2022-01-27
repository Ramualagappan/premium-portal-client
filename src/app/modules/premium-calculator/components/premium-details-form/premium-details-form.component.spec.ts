import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumDetailsFormComponent } from './premium-details-form.component';

describe('PremiumDetailsFormComponent', () => {
  let component: PremiumDetailsFormComponent;
  let fixture: ComponentFixture<PremiumDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
