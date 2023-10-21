import { Component, EventEmitter, Output } from '@angular/core';
import { EquipmentService } from '../equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  constructor(private equipmentService: EquipmentService) { }

  @Output() equipment_id: EventEmitter<any> = new EventEmitter();
  @Output() delete_equipment: EventEmitter<any> = new EventEmitter();

  eqpList: { [key: string]: any }[] = [];
  currEqp: { [key: string]: any } = { _id: null };
  formName: string = '';
  formSerialNumber: string = '';

  ngOnInit() {
    this.equipmentService.getAllEquipment().subscribe((data: any) => {
      this.eqpList = data;
    });
  }

  selectEquipment(eqp: { [key: string]: any }) {
    this.currEqp = eqp;
    this.formName = eqp['name'] || '';
    this.formSerialNumber = eqp['serialNumber'] || '';
    this.equipment_id.emit(eqp['_id']);
  }

  saveEquipment() {
    if (!this.formName || !this.formSerialNumber) {
      alert('Por favor, preencha todos os campos.')
      return;
    }
    let newEqp: { [key: string]: any } = {
      name: this.formName,
      serialNumber: this.formSerialNumber
    };
    if (this.currEqp['_id']) {
      this.equipmentService.updateEquipment(this.currEqp['_id'], newEqp).subscribe((data: any) => {
        console.log(data)
        for (const i in this.eqpList) {
          if (this.eqpList[i]['_id'] === this.currEqp['_id']) {
            newEqp['_id'] = this.currEqp['_id'];
            this.eqpList[i] = newEqp;
          }
        }
      });
    } else {
      this.equipmentService.createEquipment(newEqp).subscribe((data: any) => {
        newEqp['_id'] = data['_id'];
        this.eqpList.push(data);
        this.formName = '';
        this.formSerialNumber = '';
      });
    }
  }

  deleteEquipment() {
    this.equipmentService.deleteEquipment(this.currEqp['_id']).subscribe((data: any) => {
      this.delete_equipment.emit(this.currEqp['_id']);
      for (const i in this.eqpList) {
        if (this.eqpList[i]['_id'] === this.currEqp['_id']) {
          this.eqpList.splice(Number(i), 1);
        }
      }
      this.currEqp = { _id: null };
    });
  }
}
