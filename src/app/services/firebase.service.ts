import { Injectable, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { environment } from 'src/environment/environment.prod';
import { initializeApp } from '@angular/fire/app';
import {
  Firestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  formGroup!: FormGroup;
  public db: any;
  isSignedIn: boolean = false;

  constructor(private firestore: Firestore) {
    // Inicializa Firebase e Firestore
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Envia o form para o BD
  async sendInfo(form: any) {
    try {
      const docRef = await addDoc(
        collection(this.db, 'ListaEgressos'),
        form.value
      );
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // Percorre o BD
  async queryBd(formUSer: FormGroup) {
    const usersRef = collection(this.firestore, 'ListaEgressos');

    // Creating a query
    const q = query(usersRef, where('cpf', '!=', 'null'));

    try {
      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
        if (
          doc.data()['cpf'] == formUSer.value.cpf &&
          doc.data()['senha'] == formUSer.value.senha
        ) {
          localStorage.setItem('id', doc.id);
          return (this.isSignedIn = true);
        }
      }

      return (this.isSignedIn = false);
    } catch (error) {
      console.error('Error fetching documents:', error); // Log errors
      return (this.isSignedIn = false);
    }
  }
}
