import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getAllEquipment() {
    return this.http.get('http://54.232.47.135:3000/equipment');
  }

  createEquipment(equipment: { [key: string]: any }) {
    return this.http.post('http://54.232.47.135:3000/equipment', equipment);
  }

  updateEquipment(id: string, equipment: { [key: string]: any }) {
    return this.http.patch('http://54.232.47.135:3000/equipment/' + id, equipment);
  }

  deleteEquipment(id: string) {
    return this.http.delete('http://54.232.47.135:3000/equipment/' + id);
  }
}
