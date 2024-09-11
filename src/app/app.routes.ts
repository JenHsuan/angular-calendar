import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'callendar'},
  {
    path: 'callendar',
    loadComponent: () => import('./calendar/calendar.component').then(m => m.CalendarComponent),
    title: 'Callendar'
  }
];
