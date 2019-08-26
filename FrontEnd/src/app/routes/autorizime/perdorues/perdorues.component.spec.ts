import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdoruesComponent } from './perdorues.component';

describe('PerdoruesComponent', () => {
  let component: PerdoruesComponent;
  let fixture: ComponentFixture<PerdoruesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdoruesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdoruesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
