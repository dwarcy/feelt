import { Component } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { DadosCadastro } from 'src/app/shared/pacote_cadastro';

import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { getDatabase, ref, set } from 'firebase/database';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  formGroup!: FormGroup;
  public db: any;

  constructor(private firestore: Firestore) {
    this.formGroup = this.createForm();

    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  createForm() {
    return new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      anoConclusao: new FormControl(''),
      nomeCompleto: new FormControl(''),
      emailAtual: new FormControl(''),
      nomeOrientador: new FormControl(''),
      endereco: new FormControl(''),
      telefone: new FormControl(''),
      link: new FormControl(''),
      curso: new FormControl(''),
      nomeDaEmpresa: new FormControl(''),
      localDeTrabalho: new FormControl(''),
      cargo: new FormControl(''),
      relacaoAtividadeAtual: new FormControl(''),
      contribuicaoPos: new FormControl(''),
      faixaSalarial: new FormControl(''),
      areaProxima: new FormControl(''),
      localizacaoOcupacao: new FormControl(''),
    });
  }

  async onSubmit(form: FormGroup) {
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
