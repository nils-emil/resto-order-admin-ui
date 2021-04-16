import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {EditPersonComponent} from "./edit-person/edit-person.component";
import {DeleteModalConfirmationComponent} from "../../components/delete-modal-confirmation/delete-modal-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../httpservice/user.service";
import {LoginService} from "../../httpservice/login.service";

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['username', 'email', 'action'];
  public user: any = {};
  public dataSource = []

  constructor(public dialog: MatDialog,
              private loginService: LoginService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getCurrentInitUser();
    this.refreshAllUsers();
  }

  private refreshAllUsers() {
    this.userService.getUsers().subscribe(allUsers => {
      this.dataSource = allUsers;
    })
  }

  invertDisable(element) {
    element.disabled = !element.disabled;
  }

  deleteElement(element) {
    console.log(element)
    const dialogRef = this.dialog.open(DeleteModalConfirmationComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser({_id: element._id}).subscribe(allUsers => {
          this.dataSource = this.dataSource.filter(e => e.email !== element.email);
        })
      }
    });

  }

  editElement(element) {
    const dialogRef = this.dialog.open(EditPersonComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.refreshAllUsers();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditPersonComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.refreshAllUsers();
    });
  }
}
