import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Unit } from '../_models';

@Injectable({ providedIn: 'root' })
export class UnitService {

    constructor(
        private http: HttpClient
    ) { }

    convert(unit: Unit, type: string){

        switch (type) {
            case 'temp':
                return this.http.post(`${environment.apiUrl}/unit/temp`, unit);
                break;
            case 'length':
                return this.http.post(`${environment.apiUrl}/unit/length`, unit);
                break;
            case 'mass':
                return this.http.post(`${environment.apiUrl}/unit/mass`, unit);
                break;
            case 'power':
                return this.http.post(`${environment.apiUrl}/unit/power`, unit);
                break;
            case 'volume':
                return this.http.post(`${environment.apiUrl}/unit/volume`, unit);
                break;
            default:
                break;
        }
    }
}