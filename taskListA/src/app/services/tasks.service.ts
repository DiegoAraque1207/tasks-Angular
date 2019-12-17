import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {Task} from '../interfaces/task'
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public tasks: Task[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) { }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get('tasks').then((tasksR) => {
        if (tasksR != null){
          this.tasks = tasksR;
        }

        this.loaded = true;
        resolve(true);
      })
    })
  }

  save(): void {
    this.storage.set('tasks', this.tasks)
  }

  getTask(id): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(task): void {
    // let id = this.tasks.length 
    let id = Math.max(...this.tasks.map(task => parseInt(task.id)), 0) + 1;
    this.tasks.push({
      id: id.toString(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadLine: task.deadLine
    })

    this.save()
  }

  deleteTask(task): void {
    console.log("esta es la tarea que llego al servicio: ", task)
    let index = this.tasks.indexOf(task)
    console.log(index)
    console.log("length of tasks: ", this.tasks.length)
    if (this.tasks.length > 0){
      this.tasks.splice(index, 1)
      this.save()
    }
  }
}
