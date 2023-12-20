import { Inject, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from 'firebase/firestore';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';

import { environment } from 'src/environment/environment.prod';
import { HttpClient } from '@angular/common/http';

// Initialize firebase
// const app = initializeApp(environment.firebase)

// Initialize Cloud Firestore
// const db = getFirestore(app)

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  

  // async adicionaEgresso() {
  //   try {
  //     const testeCollection: CollectionReference<DocumentData> = await collection(this.firestore, 'test');
      
  //     addDoc(testeCollection, {text: 'Alo, teste'})
  //   } catch (error) {
  //     console.log('erro', error)
  //   }
  // }

}
