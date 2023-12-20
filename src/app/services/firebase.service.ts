import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from 'firebase/firestore';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { environment } from 'src/environment/environment.prod';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  formGroup!: FormGroup;
  public db: any;

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
}
