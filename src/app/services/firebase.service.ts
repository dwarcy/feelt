import { Injectable, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environment/environment.prod';
import { initializeApp } from '@angular/fire/app';
import {
  Firestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  getFirestore,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  formGroup!: FormGroup;
  public db: any;
  isSignedIn: boolean = false;

  infoChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private firestore: Firestore) {
    // Inicializa Firebase e Firestore
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Envia o form para o BD
  async sendInfo(form: any) {
    const id = localStorage.getItem('id');
    const userID = id ? id : '';

    try {
      // Collection ref
      await setDoc(doc(this.db, 'ListaEgressos', userID), form.value);

      // Sucesso na atualização de informação
      console.log('\nInformação atualizada com sucesso. Documento: ', id);
      this.infoChanged.next(true);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async alteraSenha(form: any) {
    const id = localStorage.getItem('id');
    const userID = id ? id : '';
    const senhaNova = form.value.senha;

    try {
      const docRef = doc(this.db, 'ListaEgressos', userID);
      await updateDoc(docRef, { senha: senhaNova });
      // Sucesso na atualização de informação
      console.log('\nInformação atualizada com sucesso. Documento: ', id);
      this.infoChanged.next(true);
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

  // Busca um documento específico do BD a partir do ID guardado no LocalStorage
  async buscaDoc() {
    let docId = localStorage.getItem('id');
    if (docId === null) {
      throw new Error('docId is null');
    }
    const docRef = doc(this.db, 'ListaEgressos', docId);
    const docSnap = await getDoc(docRef);
    console.log('Document ' + docSnap.id + ' succeesfull retrieved');
    return docSnap;
  }
}
