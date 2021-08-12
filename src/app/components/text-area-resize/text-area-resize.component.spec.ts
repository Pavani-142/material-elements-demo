import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaResizeComponent } from './text-area-resize.component';

describe('TextAreaResizeComponent', () => {
  let component: TextAreaResizeComponent;
  let fixture: ComponentFixture<TextAreaResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAreaResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
