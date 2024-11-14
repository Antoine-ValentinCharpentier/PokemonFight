import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-card',
  standalone: true,
  imports: [],
  templateUrl: './empty-card.component.html',
  styleUrl: './empty-card.component.scss'
})
export class EmptyCardComponent {
  cliquable = input<boolean>(false);
  selected = input<boolean>(false);
}
