import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-teams-card',
  templateUrl: './teams-card.component.html',
  styleUrls: ['./teams-card.component.css']
})
export class TeamsCardComponent {
  @Input() team!: {
    name: string;
    projectsCount: number;
    members: string[]
  }
  @Output() clicked = new EventEmitter<void>();

  onCardClick() {
    this.clicked.emit();
  }

}
