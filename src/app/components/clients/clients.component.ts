import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { Client } from '../../interfaces/Client';
import { ClientService } from '../../services/client.service';
import { SearchBarComponent } from '../../layout/search-bar/search-bar.component';
import { ModalDataComponent } from '../../layout/modal-data/modal-data.component'; // Importa el modal
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    ModalDataComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  private clientService = inject(ClientService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);
  modalButtons: { label: string; action: () => void; class?: string; disabled?: boolean }[] = [];


  isEditing: boolean = false; // Nueva variable para determinar si estamos en modo de edición
  selectedClient: Client | null = null; // Cliente seleccionado para edición
  textButton = 'Nuevo Cliente';
  NameComponent='Clientes';


  
  public formClient: FormGroup = this.formBuild.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,20}$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,20}$')]],
    email: [ '', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    phone: ['', [Validators.pattern(/^.{5,}$/)]],
    nit: ['', [Validators.pattern(/^.{5,}$/)]],
    address: ['', [Validators.pattern(/^.{5,}$/)]]
  });

  // Se inicializa para poder utilizar las notificaciones
  constructor(private toastr: ToastrService) {}


  // Método genérico para validar controles
  isFieldInvalid(fieldName: string): boolean {
    const control = this.formClient.get(fieldName);
    return (control?.invalid && (control.touched || control.dirty)) ?? false;
  }

  // Accesores para los campos individuales
  get isNameInvalid() {
    return this.isFieldInvalid('firstName');
  }
  get isLastNameInvalid() {
    return this.isFieldInvalid('lastName');
  }
  get isEmailInvalid() {
    return this.isFieldInvalid('email');
  }
  get isPhoneInvalid() {
    return this.isFieldInvalid('phone');
  }
  get isNitInvalid() {
    return this.isFieldInvalid('nit');
  }
  get isAddressInvalid() {
    return this.isFieldInvalid('address');
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (response) => {
        this.clients = response.data;
        this.filteredClients = [...this.clients]; // Inicializa filteredClients después de obtener los datos
        console.log(this.clients);
      },
      error: (error) => {
        console.error('Error fetching clients', error);
      },
    });
  }
  onSearch(term: string): void {
    if (term) {
      this.filteredClients = this.clients.filter((client) =>
        Object.values(client).some((value) =>
          value?.toString().toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      this.filteredClients = [...this.clients];
    }
  }

 
  isModalVisible: boolean = false;
  modalTitle = '';
 openAddClientModal() {
      this.modalButtons = [];
      this.isModalVisible = true;
      this.isEditing = false; // Modo agregar
      this.modalTitle = 'Nuevo Cliente';
      this.modalButtons = [
        {
          label: 'Guardar',
          action: () => this.saveClient(),
          class: 'btn btn-primary'
        },
        {
          label: 'Cancelar',
          action: () => this.closeModal(),
          class: 'btn btn-secondary',
        },
      ];
    }


  // Abre modal para agregar cliente
  openEditClientModal(client: Client) {
    this.modalButtons = [];
    this.isModalVisible = true;
    this.isEditing = true; // Modo edición
    this.selectedClient = client; // Guardamos el cliente seleccionado
    this.formClient.patchValue(client); // Llena el formulario con los datos del cliente

    this.modalTitle = 'Editar Cliente';
    this.modalButtons = [
      {
        label: 'Guardar',
        action: () => this.saveClient(),
        class: 'btn btn-primary',
      },
      {
        label: 'Cancelar',
        action: () => this.closeModal(),
        class: 'btn btn-secondary',
      },
    ];
  }

  // isAddButtonVisible: boolean = true; // Inicializado como true
 
  disableClient(id: number | undefined): void {
    console.log(id)
    if (!id) {
      this.toastr.error('Invalid client ID', 'Error');
      return; // Detenemos la ejecución si no hay ID
    }

    this.clientService.disableClient(id).subscribe({
      next: (response) => {
        if (response.ok) {
          this.toastr.success('Cliente deshabilitado', 'Completado');
          this.loadClients(); // Recargar la lista de clientes activos
          this.closeModal(); // Cerrar el modal después de deshabilitar el cliente
        }
      },
      error: (err) => {
        console.error('Error disabling client:', err);
        this.toastr.error('Failed to disable client', 'Error');
      },
    });
  }

  saveClient(): void {
    if (this.formClient.invalid) {
      // Si el formulario no es válido, marcamos todos los controles como tocados
      this.formClient.markAllAsTouched();
      this.toastr.error('Por favor, corrija los errores en el formulario', 'Error');
      return; // Evita que se ejecute el código de guardado
    }
    const objeto: Client = {
      firstName: this.formClient.value.firstName,
      lastName: this.formClient.value.lastName,
      email: this.formClient.value.email,
      phone: this.formClient.value.phone,
      nit: this.formClient.value.nit,
      address: this.formClient.value.address,
    };

    if (this.isEditing && this.selectedClient) {
      console.log('Guardar la Info Editada');
      objeto.clientId = this.selectedClient.clientId; // Agregar idClient al objeto
      console.log(objeto);
      this.clientService.editClient(objeto).subscribe({
        next: (data) => {
          if (data.status === 200) {
            this.toastr.success('Cliente Editado', 'Completado');
            this.formClient.reset();
            this.closeModal();
            this.loadClients();
          }
        }, 
        error: (error) => {
          console.log('Error:', error.message);
        },
      });
    } else {
      this.clientService.addClient(objeto).subscribe({
        next: (data) => {
          if (data.status === 201) {
            this.formClient.reset();
            this.toastr.success('Cliente Agregado', 'Completado');
            this.formClient.reset();
            this.closeModal();
            this.loadClients();
          }
        },
        error: (error) => {
          console.log('Error:', error.message);
        },
      });
    }
  }

  closeModal() {
    this.isModalVisible = false;
    this.formClient.reset();
  }
}
