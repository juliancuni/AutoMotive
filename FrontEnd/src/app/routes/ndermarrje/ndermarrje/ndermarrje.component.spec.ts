import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdermarrjeComponent } from './ndermarrje.component';

describe('NdermarrjeComponent', () => {
  let component: NdermarrjeComponent;
  let fixture: ComponentFixture<NdermarrjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdermarrjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdermarrjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
