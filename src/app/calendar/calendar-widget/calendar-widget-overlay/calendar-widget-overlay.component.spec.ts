import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWidgetOverlayComponent } from './calendar-widget-overlay.component';

describe('CalendarWidgetOverlayComponent', () => {
  let component: CalendarWidgetOverlayComponent;
  let fixture: ComponentFixture<CalendarWidgetOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWidgetOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarWidgetOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
