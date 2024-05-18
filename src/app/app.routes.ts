import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/full-calendar/fullcalendar.component';
import  ChartjsComponent  from './components/chartjs/chartjs.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';

export const routes: Routes = [
  {path: '', component: ListProductsComponent},
  {path: 'add', component: AddEditProductsComponent},
  {path: 'edit/:id', component: AddEditProductsComponent},

  { path: 'map', component: MapComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'chartjs', component: ChartjsComponent},

  { path: '**', redirectTo: '', pathMatch: 'full'}
];
