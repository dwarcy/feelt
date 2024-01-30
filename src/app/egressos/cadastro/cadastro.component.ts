import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FirebaseService } from 'src/app/services/firebase.service';
import { AlteraSenhaComponent } from './altera-senha/altera-senha.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements AfterViewChecked {
  formGroup!: FormGroup;
  USER_DOC: any;
  infoUpdated: boolean = false;
  rota: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private snack: MatSnackBar,
    private _dialog: MatDialog,
    private route: Router
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
    this.snack.open('Atualizado!', '', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
      duration: 2000,
    });
  }

  public openDialog(rota: string) {
    const config: MatDialogConfig = new MatDialogConfig();
    config.width = 'auto';
    config.height = 'auto';
    config.autoFocus = true;
    config.position = {};
    // config.backdropClass = 'background-color: transparent; opacity: 0.5';

    let component = this._dialog.open(AlteraSenhaComponent, config);

    component.componentInstance.rota = rota;

    component.afterClosed().subscribe((result) => {
      console.log(result);
      this.route.navigate([result]);
    });
  }
}
