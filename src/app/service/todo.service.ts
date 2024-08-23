import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

// types
import { Todo, Options } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private apiService: ApiService) { }

   // Fetching todo 
  getTodos = (url: string): Observable<Todo[]> => {
    return this.apiService.get(url, { responseType: 'json' });
  };

  // Adding todo
  addTodo(url: string, body: Todo): Observable<Todo> {
    return this.apiService.post(url, { responseType: 'json' }, body);
  }
}
