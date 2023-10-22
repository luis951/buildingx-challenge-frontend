import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private http: HttpClient) { }

  getAllPoint(equipment_id: string) {
    return this.http.get(`http://${environment.apiEndpoint}/point/byEquipment/` + equipment_id);
  }

  createPoint(point: { [key: string]: any }) {
    return this.http.post(`http://${environment.apiEndpoint}/point`, point);
  }

  updatePoint(id: string, point: { [key: string]: any }) {
    return this.http.patch(`http://${environment.apiEndpoint}/point/` + id, point);
  }

  deletePoint(id: string) {
    return this.http.delete(`http://${environment.apiEndpoint}/point/` + id);
  }
}
