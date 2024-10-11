import { SearchBarComponent } from '../../layout/search-bar/search-bar.component';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../interfaces/Provider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BankAccount } from '../../interfaces/BankAccount';
import { ToastrService } from 'ngx-toastr';
import { ModalDataComponent } from "../../layout/modal-data/modal-data.component";
@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, ReactiveFormsModule, ModalDataComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css'
})
export class ProviderComponent {
  private ProviderService = inject(ProviderService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);
  expandedProvider: number | null = null; // Currently expanded provider
  modalButtons: { label: string; action: () => void; class?: string; disabled?: boolean }[] = [];

  public formProvider: FormGroup = this.formBuild.group({
    businessName: ['', Validators.required],
    commercialName: [''],
    fiscalAddress: [''],
    nit: [''],
    phone: [''],
    email: [''],
    managerName: [''],
    managerPhone: [''],
    bankAccounts: this.formBuild.array([
      this.createBankAccountGroup(),
    ]),
  });
  
  // Método para crear un grupo de cuentas bancarias
  createBankAccountGroup(): FormGroup {
    return this.formBuild.group({
      bankName: [''],
      accountNumber: [''],
      accountType: [''],
      accountName: [''],
      currency: [''],
    });
  }
  provider: Provider[] = [];
  BankAccount:BankAccount[]=[];
  NameComponent='Proveedores'
  textButton = 'Nuevo proveedor';

  ngOnInit(): void {
    this.loadProviders();
  }
  constructor(private toastr: ToastrService) {}

  loadProviders(): void {
    this.ProviderService.getProvider().subscribe({
      next: (response) =>{
        this.provider = response.data;
      },
      error: (error) => {
        console.error('Error ', error)
      }
    });
  }

  toggleBankInfo(providerId: number): void {
    if (this.expandedProvider === providerId) {
      this.expandedProvider = null; // Collapse if already expanded
    } else {
      this.expandedProvider = providerId; // Expand if not currently expanded
    }
  }


  onSearch(term: string): void {
    console.log(term);
  }

  isModalVisible: boolean = false;
  modalTitle = '';
  isEditing  = false
  openAddProviderModal() {
    console.log('nuevoModal')
    this.modalButtons = [];
    this.isModalVisible = true;
    this.isEditing = false;
    this.modalTitle= 'Nuevo Proveedor';
    this.modalButtons = [
      {
        label: 'Guardar',
        action: () => this.saveProvider(),
        class: 'btn btn-primary'
      },
      {
        label: 'Cancelar',
        action: () => this.closeModal(),
        class: 'btn btn-secondary',
      },
    ];
  }
  selectedProvider: Provider | null = null;

  // removeBankAccount(index: number): void {
  //   console.log('Eliminar cuenta bancaria', index);
  // }
  // addBankAccount(): void {
  //   console.log('Agregar cuenta bancaria');
  // }



//
// Método para agregar una cuenta bancaria
addBankAccount(): void {
  const bankAccounts = this.formProvider.get('bankAccounts') as FormArray;
  if (bankAccounts) {
    bankAccounts.push(this.createBankAccountGroup());
  }
}

// Método para eliminar una cuenta bancaria
removeBankAccount(index: number): void {
  const bankAccounts = this.formProvider.get('bankAccounts') as FormArray;
  if (bankAccounts) {
    bankAccounts.removeAt(index);
  }
}

// Getter para acceder al array de cuentas bancarias
get bankAccounts(): FormArray {
  return this.formProvider.get('bankAccounts') as FormArray;
}
//

  saveProvider() : void{
    console.log('Guardar Proveedor')
    // if (this.formProvider.invalid) {
    //   // Si el formulario no es válido, marcamos todos los controles como tocados
    //   this.formProvider.markAllAsTouched();
    //   this.toastr.error('Por favor, corrija los errores en el formulario', 'Error');
    //   return; // Evita que se ejecute el código de guardado
    // }
    const provider: Provider = this.formProvider.value;
    if(this.isEditing  && this.selectedProvider){
      console.log('Editar Proveedor')
    }else{
        console.log('agregar Proveedor')
        this.ProviderService.addProvider(provider).subscribe({
          next: (response) => {
            if(response.ok){
              this.toastr.success('Proveedor agregado', 'Completado');
              this.loadProviders();
              this.closeModal();
            }
          },
          error: (err) => {
            console.error('Error adding provider:', err);
            this.toastr.error('Failed to add provider', 'Error');
        }
      })

    }
  }
// metodo para cuando  cierre el modal se limpie  los bankAccounts
  clearbankAccounts(): void {
    while (this.bankAccounts.length > 1) {
      this.removeBankAccount(1);
    }
    this.bankAccounts.controls[0].reset();
  }

  closeModal():  void {
    console.log('Cerrar Modal')
    this.isModalVisible = false;
    this.formProvider.reset();
    this.clearbankAccounts();
  }

}
