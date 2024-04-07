import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartInterface } from '../interfaces/chartInterfaces';


@Injectable({
  providedIn: 'root'
})

export class ChartService {
  private apiUrl: string = 'http://localhost:3000/api/chart';

  constructor(private http: HttpClient) { }

  getDatas(): Observable<ChartInterface[]> {
    return this.http.get<ChartInterface[]>(this.apiUrl);
  }
}
