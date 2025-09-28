import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-perspective-switcher',
  imports: [CommonModule],
  templateUrl: './perspective-switcher.html',
  styleUrl: './perspective-switcher.css'
})
export class PerspectiveSwitcher {
  topics = ['All', 'Politics', 'Technology', 'Sports', 'Business', 'Entertainment', 'General'];
  selectedTopic = 'All';
  
  @Output() topicChanged = new EventEmitter<string>();

  selectTopic(topic: string) {
    this.selectedTopic = topic;
    this.topicChanged.emit(topic);
  }
}
