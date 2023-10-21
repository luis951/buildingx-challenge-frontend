import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private http: HttpClient) { }

  getAllPoint(equipment_id: string) {
    return this.http.get('http://localhost:3000/point/byEquipment/' + equipment_id);
  }

  createPoint(point: { [key: string]: any }) {
    return this.http.post('http://localhost:3000/point', point);
  }

  updatePoint(id: string, point: { [key: string]: any }) {
    return this.http.patch('http://localhost:3000/point/' + id, point);
  }

  deletePoint(id: string) {
    return this.http.delete('http://localhost:3000/point/' + id);
  }
}
