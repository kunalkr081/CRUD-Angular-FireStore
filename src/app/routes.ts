import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

export const appRoutes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: '',
    redirectTo: '/employee',
    pathMatch: 'full',
  },
  { 
    path: '**', 
    component: EmployeeComponent 
  }
];
