import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { NavController } from '@ionic/angular';
import { Task } from '../interfaces/task';


@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  public task: Task
  constructor(private route: ActivatedRoute, private taskService: TasksService, private navCtrl: NavController) { 
    this.task = {
      id: '',
      title: '',
      description: '',
      priority: null,
      deadLine: null
    }
  }

  ngOnInit() {
    let taskId = this.route.snapshot.paramMap.get('id')

    if(this.taskService.loaded){
      this.task = this.taskService.getTask(taskId)
    } else {
      this.taskService.load().then(() => {
        this.task = this.taskService.getTask(taskId)
      })
    }
  }

  modifyTask(){
    this.taskService.save()
  }

  deleteTask(){
    console.log("esta es la tarea: ", this.task)
    this.taskService.deleteTask(this.task)
    this.navCtrl.navigateBack('/home')
  }
}
