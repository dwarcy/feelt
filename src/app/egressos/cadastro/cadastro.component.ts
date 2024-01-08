import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements AfterViewChecked {
  formGroup!: FormGroup;
  USER_DOC: any;
  infoUpdated: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    firebaseService.infoChanged.subscribe(() => {
      this.infoUpdated = true;
      this.retrieveInfo();
    });
    this.USER_DOC = {};
    this.retrieveInfo();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  async retrieveInfo() {
    try {
      // const userId = localStorage.getItem('id');
      const USER_DOC = await this.firebaseService.buscaDoc();
      console.log(USER_DOC.data());
      this.USER_DOC = USER_DOC;
      this.infoUpdated = false;
      this.formGroup = this.createForm(this.USER_DOC.data());
    } catch (error) {}
  }

  createForm(user: any) {
    return new FormGroup({
      cpf: new FormControl(user.cpf, [Validators.required]),
      anoConclusao: new FormControl(user.anoConclusao),
      nomeCompleto: new FormControl(user.nomeCompleto),
      emailAtual: new FormControl(user.emailAtual),
      nomeOrientador: new FormControl(user.nomeOrientador),
      endereco: new FormControl(user.endereco),
      telefone: new FormControl(user.telefone),
      link: new FormControl(user.link),
      curso: new FormControl(user.curso),
      nomeDaEmpresa: new FormControl(user.nomeDaEmpresa),
      localDeTrabalho: new FormControl(user.localDeTrabalho),
      cargo: new FormControl(user.cargo),
      relacaoAtividadeAtual: new FormControl(user.relacaoAtividadeAtual),
      contribuicaoPos: new FormControl(user.contribuicaoPos),
      faixaSalarial: new FormControl(user.faixaSalarial),
      areaProxima: new FormControl(user.areaProxima),
      localizacaoOcupacao: new FormControl(user.localizacaoOcupacao),
      senha: new FormControl(user.senha),
    });
  }

  async onSubmit(form: FormGroup) {
    this.firebaseService.sendInfo(form);
  }
}
