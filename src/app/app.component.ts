import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as e from 'cors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'pos-feelt-05';

  constructor(private firestore: Firestore, private router: Router) {}

  public ngOnInit(): void {
    // this.teste()      
  }

  async teste() {
    try {
      const testeCollection: CollectionReference<DocumentData> = await collection(this.firestore, 'test');
      
      addDoc(testeCollection, {text: 'pelo amor de deus funciona'})
    } catch (error) {
      console.log('erro', error)
    }
  }

}
