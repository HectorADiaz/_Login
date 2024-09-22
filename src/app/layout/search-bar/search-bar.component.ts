import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() searchTerm = new EventEmitter<string>();

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchTerm.emit(inputElement.value);
    }
  }
}
