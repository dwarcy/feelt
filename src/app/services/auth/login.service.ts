import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged: boolean = false;

  constructor(public firebaseAuth: AngularFireAuth) {}

  async login(cpf: string, senha: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(cpf, senha)
      .then((resposta) => {
        this.isLogged = true;
        localStorage.setItem('user', JSON.stringify(resposta.user));
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
