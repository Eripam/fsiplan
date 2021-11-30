import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgInicialComponent } from './pg-inicial.component';

describe('PgInicialComponent', () => {
  let component: PgInicialComponent;
  let fixture: ComponentFixture<PgInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
