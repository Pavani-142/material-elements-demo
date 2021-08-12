import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableGroupComponent } from './data-table-group.component';

describe('DataTableGroupComponent', () => {
  let component: DataTableGroupComponent;
  let fixture: ComponentFixture<DataTableGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
