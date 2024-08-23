import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Srvices
import { TodoService } from '../service/todo.service';

// Types
import { Todo, Todos } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // API url
  private mockApiUrl = "https://66c8d7fa8a477f50dc2f68d6.mockapi.io/api/docs/v1/data"
  
  constructor(private todoService : TodoService) {}
  
  // Attributes
  todos: Todo[] = []
  totalTodo: number = 0;
  newTodo: Partial<Todo> = {};
  successMessage: string = '';

  // Fetch function
  fetchTodo() {
    this.todoService
      .getTodos(this.mockApiUrl)
      .subscribe({
        next: (data: Todos) => {
          this.todos = data;
          this.totalTodo = data.length;
          console.log(this.totalTodo)
        },
        error: (error) => {
          console.log(error);
        },
      })
  }

  // Add todo function
  addTodo(title: string, description: string) {
    const newId = (this.totalTodo + 1).toString(); // Incremented ID
    const newTodo: Todo = {
      id: newId,
      title,
      description
    };

    this.todoService.addTodo(this.mockApiUrl, newTodo).subscribe({
      next: (data) => {
        this.fetchTodo();
        this.newTodo = {}
        this.successMessage = 'Task added successfully!'; 
          setTimeout(() => this.successMessage = '', 3000); 
        console.log(data)
      },
      error: (error) => {
        console.log(error);
      }
    });
}

  // Form onsubmit function
  onSubmit() {
    if (this.newTodo.title && this.newTodo.description) {
      this.addTodo(this.newTodo.title, this.newTodo.description)
    } return
}

  ngOnInit() {
    this.fetchTodo();
  }
}
