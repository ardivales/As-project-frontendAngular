import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersModel} from "../Models/usersModel";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";
import {UserService} from "../shared/user.service";
import * as alertify from "alertifyjs"
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private dialog: MatDialog, private userService: UserService) {
  }

  @ViewChild(MatPaginator) _paginator!: MatPaginator
  @ViewChild(MatSort) _sort!: MatSort
  usersData!: UsersModel[]
  finalData: any

  ngOnInit() {
    this.loadUsers()
  }

  displayColumns: string[] = ["id", "email", "firstName", "lastName", "phoneNumber", "sex", "channel", "action"]

  openPopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.loadUsers()
    })
  }

  loadUsers() {
    this.userService.getUsers().subscribe(result => {
      this.usersData = result.data
      this.finalData = new MatTableDataSource<UsersModel>(this.usersData)
      this.finalData.paginator = this._paginator
      this.finalData.sort = this._sort
    })
  }

  editUser(id: any) {
    this.openPopup(id)
  }

  deleteUser(id: any) {
    alertify.confirm("Remove Users:", "Do you want to remove this company?", () => {
      this.userService.deleteUsersById(id).subscribe(response => {
        this.loadUsers()
      })
    }, function () {

    })
  }

}
