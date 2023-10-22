import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getAllEquipment() {
    return this.http.get(`http://${environment.apiEndpoint}/equipment`);
  }

  createEquipment(equipment: { [key: string]: any }) {
    return this.http.post(`http://${environment.apiEndpoint}/equipment`, equipment);
  }

  updateEquipment(id: string, equipment: { [key: string]: any }) {
    return this.http.patch(`http://${environment.apiEndpoint}/equipment/` + id, equipment);
  }

  deleteEquipment(id: string) {
    return this.http.delete(`http://${environment.apiEndpoint}/equipment/` + id);
  }
}
