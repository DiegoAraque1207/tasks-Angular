import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {Task} from '../interfaces/task'

@Injectable({
  providedIn: 'root'
})
export class ArchiveAssistantService {

  public archivedTasks: Task[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) { }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get('archivedTasks').then((tasksR) => {
        if (tasksR != null){
          this.archivedTasks = tasksR;
        }

        this.loaded = true;
        resolve(true);
      })
    })
  }

  save(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.set('archivedTasks', this.archivedTasks).then(() => {
        resolve(true);
        })
      })
  }

  assingTag(){
    this.archivedTasks.forEach((task) => {
      if(task.priority == 1){
        task.color = "danger tint"
        task.tag = "!Importante!"
      } else if (task.priority > 1 && task.priority < 5){
        task.color = "warning tint"
        task.tag = "Relevante"
      } else if (task.priority > 4 && task.priority < 7){
        task.color = "primary tint"
        task.tag = "Normal"
      }
      else if (task.priority > 6 && task.priority < 10){
        task.color = "secondary tint"
        task.tag = "Pendiente"
      } else {
        task.color = "success tint"
        task.tag = "Manejable"
      }
    })
  }

  getTask(id): Task {
    return this.archivedTasks.find(task => task.id === id);
  }

  createTask(task): void {
    // let id = this.archivedTasks.length 
    let id = Math.max(...this.archivedTasks.map(task => parseInt(task.id)), 0) + 1;
    let color = ""
    var tag = ""
    if(task.priority == 1){
      color = "danger tint"
      tag = "!Importante!"
    } else if (task.priority > 1 && task.priority < 5){
      color = "warning tint"
      tag = "Relevante"
    } else if (task.priority > 4 && task.priority < 7){
      color = "primary tint"
      tag = "Normal"
    }
    else if (task.priority > 6 && task.priority < 10){
      color = "secondary tint"
      tag = "Pendiente"
    } else {
      color = "success tint"
      tag = "Manejable"
    }
    this.archivedTasks.push({
      id: id.toString(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadLine: task.deadLine,
      color: color,
      tag: tag,
      finished: false,
      finishDate: null
    })

    this.save()
  }

  deleteTask(task): void {
    console.log("esta es la tarea que llego al servicio: ", task)
    let index = this.archivedTasks.indexOf(task)
    console.log(index)
    console.log("length of tasks: ", this.archivedTasks.length)
    if (this.archivedTasks.length > 0){
      this.archivedTasks.splice(index, 1)
      this.save()
    }
  }


  reorder(){
    this.archivedTasks.sort(function(task1, task2){
      if(task1.deadLine < task2.deadLine){
        return -1
      } else if (task1.deadLine > task2.deadLine){
        return 1
      } else {
        if(task1.priority < task2.priority){
          return -1
        } else if (task1.priority > task2.priority){
          return 1
        } else {
          return 0
        }
      }
    })
    this.save()
  }
}
