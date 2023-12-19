import { Component } from '@angular/core';
import { getDatabase } from '@angular/fire/database'
import { FormsModule } from '@angular/forms';

import { DadosCadastro } from 'src/app/shared/pacote_cadastro';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html', 
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  valorInput: string = ''

  // Pacote a ser preenchido com as informações do usuário
  infoUsuario: DadosCadastro = {
    cpf: '',
    anoConclusao: '',
    nomeCompleto: '',
    emailAtual: '',
    nomeOrientador: '',
    endereco: '',
    telefone: '',
    link: '',
    curso: '',
    nomeDaEmpresa: '',
    localDeTrabalho: '',
    cargo: '',
    relacaoAtividadeAtual: '',
    contribuicaoPos: '',
    faixaSalarial: '',
    areaProxima: '',
    localizacaoOcupacao: ''
  }

  constructor() {

  }

  // Guarda as informações dos input dentro do pacote do usuário e armazena os dados no BD
  saveInformation() {
    console.log('salvando informação.')
    console.log(this.infoUsuario)
  }

  // 
  // keepInformation() {
  //   console.log('salvando informação.')
  //   console.log(this.infoUsuario)
  // }

}
