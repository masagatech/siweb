import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesettingComponent } from './languagesetting.component';

describe('LanguagesettingComponent', () => {
  let component: LanguagesettingComponent;
  let fixture: ComponentFixture<LanguagesettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
