import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-data.component.html',
  styleUrl: './modal-data.component.css'
})
export class ModalDataComponent {
  @Input() isVisible :boolean= false; 
  @Input() title = ''; // Recibe el título dinámico
  @Input() modalButtons: { label: string, action: () => void, class?: string, disabled?: boolean }[] = []; // Agrega disabled como opcional

  @Output() close = new EventEmitter<void>();

  
  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

}
