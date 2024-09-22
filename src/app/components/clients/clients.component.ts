import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { Client } from '../../interfaces/Client'
import { ClientService } from '../../services/client.service';
import { SearchBarComponent } from "../../layout/search-bar/search-bar.component";
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  private clientService = inject(ClientService);
  private router = inject(Router);
 
  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (response) => {
        this.clients = response.data; 
        this.filteredClients = [...this.clients]; // Inicializa filteredClients después de obtener los datos
        console.log(this.clients);
        },
      error: (error) => {
        console.error('Error fetching clients', error);
      }
    });
  }
  onSearch(term: string): void {
    if (term) {
      this.filteredClients = this.clients.filter(client =>
        Object.values(client).some(value =>
          value?.toString().toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      this.filteredClients = [...this.clients];
    }
  }
}
