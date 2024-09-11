import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';

import { CALENDAR_DATES_ITEM_STYLE_MAP, CalendarWidgetItemType } from './service/calendar-widget.domain';

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
  selector: 'app-calendar-widget',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.scss'
})
export class CalendarWidgetComponent {
  month: number;
  year: number;
  date: Date;

  @ViewChild('calendarDates') calendarDates: ElementRef;

  private cd = inject(ChangeDetectorRef);

  get calendarCurrentDate(): string {
    return `${MONTHS[this.month]} ${this.year}`;
  }

  ngAfterViewInit() {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();

    this.update();
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  update() {
    let dayone = new Date(this.year, this.month, 1).getDay();
    let lastdate = new Date(this.year, this.month + 1, 0).getDate();
    let monthlastdate = new Date(this.year, this.month, 0).getDate();
    let dayend = new Date(this.year, this.month, lastdate).getDay();

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
  }

  onNavigationButtonClicked(isPlus: boolean) {
    this.month = isPlus ? this.month + 1 : this.month - 1;

    if (this.month < 0 || this.month > 11) {
      this.date = new Date(this.year, this.month, new Date().getDate());
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
    } else {
      this.date = new Date();
    }

    this.update();
  }

  onTodayButtonClicked() {
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();

    this.update();
  }

  private createCalendarDatesItem(displayedDate: string, type: CalendarWidgetItemType, date: Date): HTMLLIElement {
    const item = document.createElement('li');
    item.textContent = displayedDate;
    item.setAttribute("style", CALENDAR_DATES_ITEM_STYLE_MAP.get(type) ?? "");
    item.onclick = () => {
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

    this.calendarDates.nativeElement.appendChild(item);

    return item;
  }
}
