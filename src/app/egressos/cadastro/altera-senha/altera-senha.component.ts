import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/auth/login.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-altera-senha',
  templateUrl: './altera-senha.component.html',
  styleUrls: ['./altera-senha.component.css'],
})
export class AlteraSenhaComponent {
  rota: string = '';
  formGroup!: FormGroup;
  public fieldVisibility!: boolean;
  public senhaUm!: string;
  public senhaDois: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<AlteraSenhaComponent>,
    public firebaseService: LoginService,
    private fService: FirebaseService
  ) {
    this.fieldVisibility = false;
    this.formGroup = this.createForm();
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
      senha: new FormControl(''),
    });
  }

  ngOnInit() {}

  public guardaSenhaNova(resposta: any) {
    this.senhaUm = (<HTMLInputElement>resposta.target).value;
  }

  public guardaSenhaConfirma(resposta: any) {
    this.senhaDois = (<HTMLInputElement>resposta.target).value;
  }

  public async onSubmit(form: FormGroup) {
    // Compara ambas senhas, para ver se são iguais e se forem, é definida como a nova senha
    console.log('Senha um: ', this.senhaUm, '\nSenha dois: ', this.senhaDois);

    if (this.senhaUm == this.senhaDois) {
      this.fService.alteraSenha(this.formGroup);
      console.log('Senha alterada com sucesso.');
    } else console.log('Senhas não batem.');
  }

  public alteraVisibilidade() {
    this.fieldVisibility = !this.fieldVisibility;
  }

  public close() {
    let rotaClose = '/egressos/follow-up';
    this.dialogRef.close(rotaClose);
  }
}
