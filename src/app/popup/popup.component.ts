import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserService} from "../shared/user.service";
import {ChannelService} from "../shared/channel.service";
import {ChannelModel} from "../Models/channelModel";
import * as alertify from "alertifyjs"
import {UsersModel} from "../Models/usersModel";
import {BaseModel} from "../Models/BaseModel";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  constructor(private builder: FormBuilder, private dialog: MatDialog, private userApi: UserService, private channelService: ChannelService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  channelLists: any
  updateData: any

  ngOnInit() {
    this.getAll() //Get channel List and use in the html component
    if (this.data.id != '' && this.data.id != null) {
      this.userApi.getUsersById(this.data.id).subscribe(response => {
        this.updateData = <UsersModel>response.data
        this.usersForms.setValue({
          id: this.updateData.id,
          firstName: this.updateData.firstName,
          lastName: this.updateData.lastName,
          email: this.updateData.email,
          phoneNumber: this.updateData.phoneNumber,
          sex: this.updateData.sex,
          channelId: this.updateData.channelId
        })
      })
    }
  }

  //Genere le formulaire
  usersForms = this.builder.group({
    id: this.builder.control({value: '', disabled: true}),
    email: this.builder.control('', Validators.email),
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    phoneNumber: this.builder.control('', Validators.required),
    sex: this.builder.control('', Validators.required),
    channelId: this.builder.control('', Validators.required),
  })

  //gere le save et le update du formualaire
  saveUser() {
    if (this.usersForms.valid) {
      const userId = this.usersForms.getRawValue().id
      if (userId != '' && userId != null) {
        this.userApi.updateUser(userId, this.usersForms.getRawValue()).subscribe(response => {
          this.dialog.closeAll()
          if (response.status == "success") {
            alertify.success(response.message)
          } else {
            alertify.error(response.message + ':' + response.error_description)
          }
        })
      } else {
        this.userApi.createUser(this.usersForms.value).subscribe(response => {
          this.dialog.closeAll()
          if (response.status == "success") {
            alertify.success(response.message)
          } else {
            alertify.error(response.message + ':' + response.error_description)
          }
        })
      }
    }
  }

  //recuprer la liste des channel
  getAll() {
    this.channelService.getChannels().subscribe(result => {
      return this.channelLists = <ChannelModel>result.data
    })
  }

  //fonction de fermeture
  closePopup() {
    this.dialog.closeAll()
  }
}
