import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInitComponent } from './table-init.component';

describe('TableInitComponent', () => {
  let component: TableInitComponent;
  let fixture: ComponentFixture<TableInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
