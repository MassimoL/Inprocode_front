import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullCalendarInterface } from '../interfaces/fullcalendarInterface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FullCalendarService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/fullcalendar/';
  }

  getListDates(): Observable<FullCalendarInterface[]> {
    return this.http.get<FullCalendarInterface[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteDate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveDate(date: FullCalendarInterface): Observable<FullCalendarInterface> {
    return this.http.post<FullCalendarInterface>(`${this.myAppUrl}${this.myApiUrl}`, date);
  }
}
