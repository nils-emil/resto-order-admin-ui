import {Component, OnInit, ViewChild} from '@angular/core';
import {SocketService} from "../../socketservice/socket.service";
import {MatTable} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ViewOrderDetailsComponent} from "../../components/view-order-details/view-order-details.component";
import {OrderService} from "../../httpservice/order.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  public serviceCalls = [];
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource: any = [];
  public limit = 50;
  public loadingMoreItemsToInfinitySroll = false;

  constructor(protected socketService: SocketService,
              protected orderService: OrderService,
              public dialog: MatDialog) {
  }

  loadMore(): void {
    this.limit = this.limit + 25;
    this.orderService.getLatestEvents(this.limit).subscribe(result => {
      this.dataSource = result
      this.table.renderRows();
    })
  }

  markTableServiced(tableInfo): void {
    let info = {
      isServiceCall: tableInfo.callType === 'PAYMENT' || tableInfo.callType === 'SERVICE',
      isOrder: tableInfo.callType !== 'PAYMENT' && tableInfo.callType !== 'SERVICE',
      _id: tableInfo._id
    }
    this.socketService.markServices(info)
  }

  ngOnInit(): void {
    this.orderService.getLatestEvents(this.limit).subscribe(result => {
      this.dataSource = result
      this.table.renderRows();
    })

    this.socketService.serviceCalls().subscribe(e => {
      this.dataSource.unshift(e);
      this.dataSource = this.dataSource.slice(0, 100)
      this.table.renderRows();
    })

    this.socketService.listenForTablesThatAreServiced().subscribe(table => {
      let existingTable = this.dataSource.find(e => e._id === table._id)
      if (existingTable) {
        existingTable.isWaiting = table.isWaiting
      }
    })

    this.socketService.orders().subscribe(e => {
      this.dataSource.unshift(e);
      this.dataSource = this.dataSource.slice(0, 100)
      this.table.renderRows();
    })
  }

  getReason(callType: any) {
    if (callType === 'PAYMENT') {
      return "Maksmine"
    }
    return "Teenindus";
  }

  viewOrderDetails(element) {

    const dialogRef = this.dialog.open(ViewOrderDetailsComponent, {
      width: '100%',
      data: {order: element.orderContent}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
