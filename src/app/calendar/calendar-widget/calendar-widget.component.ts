import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayModule, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { CalendarWidgetOverlayComponent } from './calendar-widget-overlay/calendar-widget-overlay.component';
import { CALENDAR_WIDGET_DATA } from './service/calendar-widget.domain';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    CalendarWidgetOverlayComponent
  ],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.scss'
})
export class CalendarWidgetComponent {
  @ViewChild('openOverlayInput') openOverlayInput: ElementRef;

  private overlayCancelledSubject = new BehaviorSubject<boolean | undefined>(undefined);
  overlayCancelled$ = this.overlayCancelledSubject.asObservable();

  private dateSubject = new BehaviorSubject<Date>(new Date());
  date$ = this.dateSubject.asObservable();
  
  private overlayRef: OverlayRef | null = null;
  protected destroyed = new Subject();
  
  get selectedDateTime(): string {
    return this.dateSubject.value.toLocaleString();
  }

  constructor(
    private overlay: Overlay,
    private viewContainer: ViewContainerRef,
  ){}
  
  ngOnInit() {
    this.registerOverlayCanceling();
  }

  ngDestroy() { 
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  protected onOverlayOpened() {
    if (!this.overlayRef) {
     const positionStrategy = this.getPositionStrategy();
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: "cdk-overlay-transparent-backdrop",
        positionStrategy
      });
    }

    const injector = Injector.create({
      providers: [
        {
          provide: CALENDAR_WIDGET_DATA,
          useValue: {
            dateSubject: this.dateSubject,
            overlayCancelledSubject: this.overlayCancelledSubject,
          },
        },
      ],
    });

    const component = new ComponentPortal(CalendarWidgetOverlayComponent, this.viewContainer, injector);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef!.detach());
    this.overlayRef.attach(component);
  }

  private registerOverlayCanceling() {
    this.overlayCancelled$.pipe(
      filter(value => !!value),
      takeUntil(this.destroyed),
    ).subscribe((v) => {
      this.onOverlayClosed()
  });
  }

  protected onOverlayClosed() {
    if (!_.isNil(this.overlayRef)) {
      this.overlayRef.detach();
    }
  }
  
  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.openOverlayInput)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top'
        }
      ]);
  }
}
