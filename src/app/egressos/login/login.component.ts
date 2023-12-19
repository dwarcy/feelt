import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  rota : string ='';
  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

  public loginSucesso() {
    this.dialogRef.close(this.rota)
  }
  close(){
  }

}
