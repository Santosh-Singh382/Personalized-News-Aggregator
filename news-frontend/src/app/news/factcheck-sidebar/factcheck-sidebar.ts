import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-factcheck-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factcheck-sidebar.html',
  styleUrls: ['./factcheck-sidebar.css']
})
export class FactcheckSidebar {
  @Input() news: any;
}
