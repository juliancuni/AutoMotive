import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KartelaPerdoruesComponent } from './kartela-perdorues.component';

describe('KartelaPerdoruesComponent', () => {
  let component: KartelaPerdoruesComponent;
  let fixture: ComponentFixture<KartelaPerdoruesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KartelaPerdoruesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KartelaPerdoruesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
