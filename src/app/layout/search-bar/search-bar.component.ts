import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';

 
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Output() searchTerm = new EventEmitter<string>();
  @Input() textButton = ''; // Recibe el título dinámico
  @Input() isActiveAdd: boolean = false;
  @Input() action: () => void = () => {}; // Recibe una única función como acción
  @Input() NameComponent='';
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchTerm.emit(inputElement.value);
    }
  }

    
  }




  
 
 