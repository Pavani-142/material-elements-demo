import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddClassComponent } from './new-add-class.component';

describe('NewAddClassComponent', () => {
  let component: NewAddClassComponent;
  let fixture: ComponentFixture<NewAddClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAddClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
