import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {order: any}) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
