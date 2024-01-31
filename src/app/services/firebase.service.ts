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
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // Declaração de variáveis
  formGroup!: FormGroup;
  public db: any;
  isSignedIn: boolean = false;

  // Recebe confirmação de quando a informação é atualizada lá no BD
  infoChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private firestore: Firestore) {
    // Inicializa Firebase e Firestore
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Envia o form para o BD
  async sendInfo(form: any) {
    // Pega o documentID armazenado no LocalStorage do usuário loggado
    const id = localStorage.getItem('id');
    const userID = id ? id : '';

    try {
      // Adiciona o novo form ao documento com mesmo ID lá no BD
      await setDoc(doc(this.db, 'ListaEgressos', userID), form.value);

      // Sucesso na atualização de informação
      console.log('\nInformação atualizada com sucesso. Documento: ', id);
      // Envia a informação que a atualização foi bem sucedida
      this.infoChanged.next(true);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // Processo específico para a troca de senha do usuário
  async alteraSenha(form: any) {
    const id = localStorage.getItem('id');
    const userID = id ? id : '';
    const senhaNova = form.value.senha;

    try {
      // Referencia o documento com o mesmo ID do usuário que fez a requisição para a troca de senha
      const docRef = doc(this.db, 'ListaEgressos', userID);
      // Altera a senha no campo específico do documento
      await updateDoc(docRef, { senha: senhaNova });

      // Sucesso na atualização de informação
      console.log('\nInformação atualizada com sucesso. Documento: ', id);
      // Envia a confirmação que a atualizaçao foi bem sucedida
      this.infoChanged.next(true);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // Percorre o BD e encontra o documento do usuário que está loggando, armazenando o ID desse documento
  async queryBd(formUSer: FormGroup) {
    // Referência à collection onde está armazenada o documento do usuário
    const usersRef = collection(this.firestore, 'ListaEgressos');

    // Creating a query
    // Adiciona à query apenas os documentos que tem o campo cpf diferente de nulo
    const q = query(usersRef, where('cpf', '!=', 'null'));
    try {
      // Pega todos os documentos da query
      const querySnapshot = await getDocs(q);

      // Percorre esses documentos
      for (const doc of querySnapshot.docs) {
        // Compara as informações guardadas nos documentos com as informações fornecidas na hora do login
        if (
          doc.data()['cpf'] == formUSer.value.cpf &&
          doc.data()['senha'] == formUSer.value.senha
        ) {
          // Caso a comparação seja bem sucedida, o ID do documento é armazenado no LocalStorage
          localStorage.setItem('id', doc.id);
          // Retorna a confirmação do login bem sucedido
          return (this.isSignedIn = true);
        }
      }
      return (this.isSignedIn = false);
    } catch (error) {
      console.error('Error fetching documents:', error); // Log errors
      return (this.isSignedIn = false);
    }
  }

  async percorreCollectionEgressos(opcCollec: string) {
    // Referência à collection onde está armazenada o documento do usuário
    const usersRef = collection(this.firestore, opcCollec);
    let usersList: Array<DocumentData> = [];

    const q = query(usersRef, where('cpf', '!=', 'null'));
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      if (doc.data()['cpf'] != '') {
        usersList.push(doc.data());
      }
    }

    return usersList;
  }

  async percorreCollectionPesquisadores(opcCollec: string) {
    // Referência à collection onde está armazenada o documento do usuário
    const usersRef = collection(this.firestore, opcCollec);
    let usersList: Array<DocumentData> = [];

    const q = query(usersRef, where('nomePesquisador', '!=', ''));
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      if (doc.data()['cpf'] != '') {
        usersList.push(doc.data());
      }
    }

    return usersList;
  }

  // Busca um documento específico do BD a partir do ID guardado no LocalStorage
  async buscaDoc() {
    let docId = localStorage.getItem('id');
    // Caso não haja ID armazenado no LocalStorage
    if (docId === null) {
      throw new Error('docId is null');
    }
    // Referência ao documento guardado na collection com o ID guardado no LocalStorage
    const docRef = doc(this.db, 'ListaEgressos', docId);
    // Busca os dados guardados nesse documento
    const docSnap = await getDoc(docRef);
    console.log('Document ' + docSnap.id + ' succeesfull retrieved');
    return docSnap;
  }
}
