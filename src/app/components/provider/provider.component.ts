import { SearchBarComponent } from '../../layout/search-bar/search-bar.component';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../interfaces/Provider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

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

  public formProvider: FormGroup = this.formBuild.group([
    businessName: ['']
  ])

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

  saveProvider() : void{
    console.log('Guardar Proveedor')
  }

  closeModal():  void {
    console.log('Cerrar Modal')
    this.isModalVisible = false;
    // this.formClient.reset();
  }

}
