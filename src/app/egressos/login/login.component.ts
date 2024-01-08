import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/auth/login.service';
import { FirebaseService } from 'src/app/services/firebase.service';

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
    public firebaseService: LoginService,
    private fService: FirebaseService
  ) {
    this.formGroup = this.createForm();
  }

  createForm() {
    return new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  public async onSubmit(form: FormGroup) {
    const resultado = await this.fService.queryBd(form);
    this.isSignedIn = resultado;

    if (resultado) {
      console.log(
        'Login efetuado com sucesso: ',
        resultado,
        '\n',
        localStorage.getItem('id')
      );
      this.redirecionaRota();
    } else console.log('Não foi possível efetuar o login: ', resultado);
  }

  redirecionaRota() {
    this.dialogRef.close(this.rota);
  }

  public close() {
    let rotaClose = '';
    this.dialogRef.close(rotaClose);
  }
}
