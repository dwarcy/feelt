import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged: boolean = false;

  constructor(public firebaseAuth: AngularFireAuth) {}

  async login(usuario: string, password: string) {
    // await this.firebaseAuth.
  }
}
