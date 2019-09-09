import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MekaniketComponent } from './mekaniket.component';

describe('MekaniketComponent', () => {
  let component: MekaniketComponent;
  let fixture: ComponentFixture<MekaniketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MekaniketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MekaniketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
