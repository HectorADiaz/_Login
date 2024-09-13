import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor(private router: Router) {}

    cerrarSesion() {
      // Remover el token o cualquier dato que hayas almacenado
      localStorage.removeItem('token'); // O sessionStorage si prefieres
      // También puedes limpiar cualquier otro dato relacionado al usuario

      // Redirigir al login
      this.router.navigate(['/login']);

  }
}
