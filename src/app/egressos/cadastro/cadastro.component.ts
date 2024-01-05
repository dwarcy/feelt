import { Component } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  formGroup!: FormGroup;
  USER_DOC: any;

  constructor(private firebaseService: FirebaseService) {
    this.formGroup = this.createForm();
  }

  async ngOnInit() {
    try {
      const userId = localStorage.getItem('id');
      const USER_DOC = await this.firebaseService.buscaDoc();
      console.log(USER_DOC.data());

      // if (localStorage.getItem('id') != null && this.USER_DOC != null) {
      //   this.formGroup.setValue({
      //     cpf: USER_DOC.data()['cpf'],
      //   });
      // }
    } catch (error) {}
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
    this.firebaseService.sendInfo(form);
  }
}
