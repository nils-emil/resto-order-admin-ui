import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {AddTableComponent} from "./add-table/add-table.component";
import {DeleteModalConfirmationComponent} from "../../components/delete-modal-confirmation/delete-modal-confirmation.component";
import {TableService} from "../../httpservice/table.service";

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.css']
})
export class TableManagementComponent implements OnInit {


  constructor(public dialog: MatDialog,
              private tableService: TableService) {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public newTable = {
    "description": "",
    "code": "",
    "disabled": true
  }

  @ViewChild(MatTable) table: MatTable<any>;

  public dataSource = []


  ngOnInit(): void {
    this.tableService.getAllTables().subscribe(e => {
      this.dataSource = e;
    })
  }

  invertDisable(element) {
    element.disabled = !element.disabled;
  }

  deleteElement(element) {
    const dialogRef = this.dialog.open(DeleteModalConfirmationComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(element)
        this.tableService.deleteTable(element).subscribe(success => {
          this.tableService.getAllTables().subscribe(e => {
            this.dataSource = e;
          })
        })
      }
    });
  }

  submit() {
    this.dataSource.push(this.newTable);
    this.newTable = {
      "description": "",
      "code": "",
      "disabled": true
    }
    console.log(this.dataSource)
    this.table.renderRows();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.tableService.getAllTables().subscribe(e => {
        this.dataSource = e;
      })
    });
  }

  editElement(element) {
    console.log(element)
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.tableService.getAllTables().subscribe(e => {
        this.dataSource = e;
      })
    });
  }
}
