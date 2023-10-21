import { Component } from '@angular/core';
import { EquipmentService } from './equipment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buildingx-challenge-frontend';
  equipment_id: string = '';
  delete_equipment: string = '';
}
