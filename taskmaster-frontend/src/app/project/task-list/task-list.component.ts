import {Component, inject} from '@angular/core';
import {Task} from '../../task.model';
import {AsyncPipe, DatePipe} from '@angular/common';
import {TaskService} from '../../services/task.service';
import {TaskFormComponent} from '../task-form/task-form.component';
import {Observable} from 'rxjs';

const emptyTask = {
  name: '',
  description: '',
  dueDate: new Date(),
  completed: false,
  project: 1,
  id: 0,
};

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    DatePipe, TaskFormComponent, AsyncPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[] = [];
  showModal: boolean = false;
  formType: 'CREATE' | 'UPDATE' = 'CREATE';
  selectedTask: Task = emptyTask;
  tasks$!: Observable<Task[]>;

  private taskService = inject(TaskService);

  constructor() {
    this.updateTasks();
  }

    updateTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  handleCheckbox(id: number) {
    this.taskService.getTaskById(id).subscribe((task) => {
      if (task) {
        const updatedTask = { ...task, completed: !task.completed };
        this.taskService.updateTask(updatedTask).subscribe(() => {
          this.updateTasks();
        });
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.updateTasks();
    });
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.formType = 'UPDATE';
    this.showModal = true;
  }

  addNewTask() {
    this.selectedTask = emptyTask;
    this.formType = 'CREATE';
    this.showModal = true;
  }

  handleModalClose(type: 'SUBMIT' | 'CANCEL') {
    if (type === 'SUBMIT') {
      this.updateTasks();
    }
    this.showModal = false;
  }
}
