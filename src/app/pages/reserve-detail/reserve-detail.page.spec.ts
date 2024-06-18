import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReserveDetailPage } from './reserve-detail.page';

describe('ReserveDetailPage', () => {
  let component: ReserveDetailPage;
  let fixture: ComponentFixture<ReserveDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
