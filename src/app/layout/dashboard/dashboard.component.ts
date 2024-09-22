import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TableInitComponent } from "../table-init/table-init.component";
import { CommonModule } from '@angular/common';
import { ClientsComponent } from "../../components/clients/clients.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, TableInitComponent, CommonModule, ClientsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  admin:boolean = false;
  currentView: string = 'dashboard'; // Vista por defecto

  setView(view: string) {
    this.currentView = view;
  }
}
