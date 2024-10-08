import { Component } from '@angular/core';
import { SearchBarComponent } from '../../layout/search-bar/search-bar.component';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css'
})
export class ProviderComponent {
  NameComponent='Proveedores'
  textButton = 'Nuevo proveedor';



  onSearch(term: string): void {
    console.log(term);
  }


  openAddClientModal() {
    console.log('nuevoModal')

  }

}
