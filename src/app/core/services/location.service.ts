import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ILocation } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private isAutoLocation = true;
  private staticLocation = '';

  constructor(private http: HttpClient) {}

  public getLocation(): Observable<ILocation> {
    const url = `http://ip-api.com/json/?lang=ru`;

    return this.http.get<ILocation>(url).pipe(take(1));
  }

  public saveLocation(location: string) {
    this.isAutoLocation = false;
    this.staticLocation = location;
  }

  public getStaticLocation(): string {
    return this.staticLocation;
  }

  public set autoLocation(flag: boolean) {
    this.isAutoLocation = flag;
  }

  public get autoLocation() {
    return this.isAutoLocation;
  }
}
