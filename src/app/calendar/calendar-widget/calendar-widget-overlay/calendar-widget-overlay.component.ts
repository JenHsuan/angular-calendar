import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import _ from 'lodash';

import { CALENDAR_DATES_ITEM_STYLE_MAP, CalendarWidgetItemType, CALENDAR_WIDGET_DATA, CalendarWidgetItemParams, YEAR_CALENDAR_ITEM_STYLE_MAP } from '../service/calendar-widget.domain';

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

@Component({
  selector: 'app-calendar-widget-overlay',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './calendar-widget-overlay.component.html',
  styleUrl: './calendar-widget-overlay.component.scss'
})
export class CalendarWidgetOverlayComponent {
  month: number;
  year: number;
  date: Date;
  hour: string;
  minute: string;

  isCalendarDatesItemsDisplayed = true;
  yearCalendarSize = 25;

  @ViewChild('calendarDates') calendarDates: ElementRef;
  @ViewChild('yearCalendaritems') yearCalendaritems: ElementRef;

  private cd = inject(ChangeDetectorRef);


  protected params: CalendarWidgetItemParams = inject(CALENDAR_WIDGET_DATA);

  get calendarCurrentDate(): string {
    return `${MONTHS[this.month]} ${this.year}`;
  }

  get candidateHours(): string[] {
    return Array(24).fill(0).map((data, index) => {
      return index < 10 ? `0${index}` : `${index}`;
    });
  }

  get candidateMinutes(): string[] {
    return Array(60).fill(0).map((data, index) => {
      return index < 10 ? `0${index}` : `${index}`;
    });
  }

  ngAfterViewInit() {
    this.resetDateTimeProperties();

    this.update();
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  update() {
    if (this.isCalendarDatesItemsDisplayed) {
      const dayone = new Date(this.year, this.month, 1).getDay();
      const lastdate = new Date(this.year, this.month + 1, 0).getDate();
      const monthlastdate = new Date(this.year, this.month, 0).getDate();
      const dayend = new Date(this.year, this.month, lastdate).getDay();
  
      //remove existed items
      while (this.calendarDates.nativeElement.firstChild) {
        this.calendarDates.nativeElement.removeChild(this.calendarDates.nativeElement.firstChild);
      }
  
      //inactive
      for (let i = dayone; i > 0; i--) {
        this.calendarDates.nativeElement.appendChild(this.createCalendarDatesItem((monthlastdate - i + 1).toString(), CalendarWidgetItemType.INACTIVE, new Date(this.year, this.month - 1, monthlastdate - i + 1)));
      }
  
      //active
      for (let i = 0; i < lastdate; i++) {
        const type = i === (this.date.getDate() - 1) && this.month === this.date.getMonth() && this.year === this.date.getFullYear() ? CalendarWidgetItemType.ACTIVE : CalendarWidgetItemType.NONE;
        this.calendarDates.nativeElement.appendChild(this.createCalendarDatesItem((i + 1).toString(), type, new Date(this.year, this.month, i + 1)));
      }
  
      //inactive
      for (let i = dayend; i < 6; i++) {
        this.calendarDates.nativeElement.appendChild(this.createCalendarDatesItem((i - dayend + 1).toString(), CalendarWidgetItemType.INACTIVE, new Date(this.year, this.month + 1, i - dayend + 1)));
      }
    } else {
      //remove existed items
      while (this.yearCalendaritems.nativeElement.firstChild) {
        this.yearCalendaritems.nativeElement.removeChild(this.yearCalendaritems.nativeElement.firstChild);
      }

      const halfSize = Math.floor(this.yearCalendarSize / 2);
      const startYear = this.year - halfSize;

      for (let i = 0; i < halfSize; i++) {
        this.yearCalendaritems.nativeElement.appendChild(this.createYearCalendarItem((startYear + i).toString(), CalendarWidgetItemType.INACTIVE));
      }

      this.yearCalendaritems.nativeElement.appendChild(this.createYearCalendarItem((startYear + halfSize).toString(), CalendarWidgetItemType.ACTIVE));

      for (let i = halfSize + 1; i < this.yearCalendarSize; i++) {
        this.yearCalendaritems.nativeElement.appendChild(this.createYearCalendarItem((startYear + i).toString(), CalendarWidgetItemType.INACTIVE));
      }
    }
  }

  onNavigationButtonClicked(isPlus: boolean) {
    if (this.isCalendarDatesItemsDisplayed) {
      this.month = isPlus ? this.month + 1 : this.month - 1;
  
      if (this.month < 0 || this.month > 11) {
        this.date = new Date(this.year, this.month, new Date().getDate());
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
      } else {
        this.date = new Date();
      }
  
      this.update();
    } else {
      const delta = Math.floor(this.yearCalendarSize / 2);
      this.year = isPlus ? this.year + delta : this.year - delta;
      this.update();
    }
  }

  onTodayButtonClicked() {
    this.resetDateTimeProperties();

    this.update();

    this.params.dateSubject.next(this.date);
  }

  onOkButtonClicked() {
    this.params.overlayCancelledSubject.next(true);
  }

  private resetDateTimeProperties() {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.hour = this.date.getHours().toString();
    this.minute = this.date.getMinutes().toString();

    if (this.hour.length === 1) {
      this.hour = `0${this.hour}`;
    } 
    
    if (this.minute.length === 1) {
      this.minute = `0${this.minute}`;
    }
  }

  private createYearCalendarItem(displayedYear: string, type: CalendarWidgetItemType): HTMLLIElement {
    const item = document.createElement('li');
    item.textContent = displayedYear;
    item.setAttribute("style", YEAR_CALENDAR_ITEM_STYLE_MAP.get(type) ?? "");
    item.onclick = () => {
      this.onYearCalendarItemClicked(displayedYear);
    };

    if (type !== CalendarWidgetItemType.ACTIVE) {
      item.onmouseenter = () => {
        item.style.backgroundColor = '#f2f2f2';
      };
  
      item.onmouseleave = () => {
        item.style.backgroundColor = '#fff';
      };
    }

    return item;
  }

  private createCalendarDatesItem(displayedDate: string, type: CalendarWidgetItemType, date: Date): HTMLLIElement {
    const item = document.createElement('li');
    item.textContent = displayedDate;
    item.setAttribute("style", CALENDAR_DATES_ITEM_STYLE_MAP.get(type) ?? "");
    item.onclick = () => {
      this.onCalendarDatesItemClicked(date);
      console.log(date);
    };

    if (type !== CalendarWidgetItemType.ACTIVE) {
      item.onmouseenter = () => {
        item.style.backgroundColor = '#f2f2f2';
      };
  
      item.onmouseleave = () => {
        item.style.backgroundColor = '#fff';
      };
    }

    return item;
  }

  onHourChanged(hour: string) {
    this.hour = hour;
    this.date.setHours(parseInt(this.hour));

    this.params.dateSubject.next(this.date);
  }

  onMinuteChanged(minute: string) {
    this.minute = minute;
    this.date.setMinutes(parseInt(this.minute));

    this.params.dateSubject.next(this.date);
  }

  onCurrentDateClicked() {
    if (this.isCalendarDatesItemsDisplayed) {
      this.isCalendarDatesItemsDisplayed = !this.isCalendarDatesItemsDisplayed;  
    }

    this.update();
  }

  private onCalendarDatesItemClicked(date: Date) {
    this.date = date;
    this.date.setHours(parseInt(this.hour));
    this.date.setMinutes(parseInt(this.minute));

    this.update();
    this.params.dateSubject.next(this.date);
  }

  private onYearCalendarItemClicked(year: string) {
    this.year = parseInt(year);
    this.date.setHours(this.year);
    this.isCalendarDatesItemsDisplayed = true;
    
    this.update();
  }
}
