import { Component } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component'
import { ProjectTitleComponent } from './project-title/project-title.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ProjectTitleComponent, TaskListComponent, ProgressBarComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {}
