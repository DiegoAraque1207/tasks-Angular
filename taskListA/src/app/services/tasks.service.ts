import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {Task} from '../interfaces/task'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { DomSanitizer } from '@angular/platform-browser';

class Photo {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public tasks: Task[] = [];
  public loaded: boolean = false;
  public photo: Photo = null;

  constructor(private storage: Storage, private camera: Camera, private sanitization:DomSanitizer) { }

  takePicture(id){
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = {data: 'data:image/jpge;base64, ' + imageData}
      let tempTask = this.getTask(id)
      // tempTask.picture = 'data:image/jpge;base64, ' + imageData
      tempTask.picture = this.sanitization.bypassSecurityTrustUrl("data:image/*;base64, " + imageData);
      this.save()
    }, (err) => {
      console.log("problemas camarita?: " + err)
    })
  }

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

  save(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.set('tasks', this.tasks).then(() => {
        resolve(true);
        })
      })
  }

 

  assingTag(){
    this.tasks.forEach((task) => {
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
    return this.tasks.find(task => task.id === id);
  }

  createTask(task): void {
    // let id = this.tasks.length 
    let id = Math.max(...this.tasks.map(task => parseInt(task.id)), 0) + 1;
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
    this.tasks.push({
      id: id.toString(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadLine: task.deadLine,
      color: color,
      tag: tag,
      finished: false,
      finishDate: null,
      picture: null
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


  reorder(){
    this.tasks.sort(function(task1, task2){
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
