import { Component, Input, SimpleChanges } from '@angular/core';
import { PointService } from '../point.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent {
  pointList: { [key: string]: any }[] = [];
  formName = '';
  formDataType = '';
  formValue = 0;
  currPoint: { [key: string]: any } = { _id: null };

  @Input() equipment_id: string = '';
  @Input() delete_equipment: string = '';

  constructor(private pointService: PointService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes['equipment_id']) {
      if (changes['equipment_id']['currentValue'] != '') {
        this.pointService.getAllPoint(this.equipment_id).subscribe((data: any) => {
          this.pointList = data;
        });
      }
      this.pointList = [];
      this.currPoint = { _id: null };
      this.formName = '';
      this.formDataType = '';
      this.formValue = 0;
    } else if (changes['delete_equipment']) {
      if (changes['delete_equipment']['currentValue'] != '') {
        this.pointService.getAllPoint(this.delete_equipment).subscribe((data: any) => {
          for (const point of this.pointList) {
            this.currPoint = point;
            this.deletePoint()
          }
          this.pointList = [];
        });
      }
    }
  }

  selectPoint(point: { [key: string]: any }) {
    this.currPoint = point;
    this.formName = point['name'] || '';
    this.formDataType = point['dataType'] || '';
    this.formValue = point['value'] || 0;
  }

  savePoint() {
    if (!this.formName || !this.formDataType || !this.formValue) {
      alert('Por favor, preencha todos os campos.')
      return;
    }
    let newPoint: { [key: string]: any } = {
      name: this.formName,
      dataType: this.formDataType,
      value: this.formValue,
      equipment: this.equipment_id
    };
    if (this.currPoint['_id']) {
      this.pointService.updatePoint(this.currPoint['_id'], newPoint).subscribe((data: any) => {
        console.log(data)
        for (const i in this.pointList) {
          if (this.pointList[i]['_id'] === this.currPoint['_id']) {
            newPoint['_id'] = this.currPoint['_id'];
            this.currPoint[i] = newPoint;
          }
        }
      });
    } else {
      this.pointService.createPoint(newPoint).subscribe((data: any) => {
        newPoint['_id'] = data['_id'];
        this.pointList.push(data);
        this.currPoint = { _id: null };
        this.formName = '';
        this.formDataType = '';
        this.formValue = 0;
      });
    }
  }

  deletePoint() {
    this.pointService.deletePoint(this.currPoint['_id']).subscribe((data: any) => {
      for (const i in this.pointList) {
        if (this.pointList[i]['_id'] === this.currPoint['_id']) {
          this.pointList.splice(Number(i), 1);
        }
      }
      this.currPoint = { _id: null };
    });
  }
}
