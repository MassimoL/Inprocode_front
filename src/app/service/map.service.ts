import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapInterface } from '../interfaces/mapInterface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/map/';
  }

  getLocations(): Observable<MapInterface[]> {
    return this.http.get<MapInterface[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveLocation(location: MapInterface): Observable<MapInterface> {
    return this.http.post<MapInterface>(`${this.myAppUrl}${this.myApiUrl}`, location);
  }
}
