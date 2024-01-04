import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  rota: string = '';
  isSignedIn = false;
  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public firebaseService: LoginService
  ) {
    this.formGroup = this.createForm();
  }

  createForm() {
    return new FormGroup({
      cpf: new FormControl(''),
      senha: new FormControl(''),
    });
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  public async onSubmit(form: FormGroup) {
    await this.firebaseService.login(
      form.get('cpf')?.value,
      form.get('senha')?.value
    );

    this.dialogRef.close(this.rota);
  }
  close() {}
}
