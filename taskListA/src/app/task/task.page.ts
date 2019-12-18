import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { Task } from '../interfaces/task';


@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  @Input() id: string;

  public task: Task
  constructor(navParams: NavParams, private route: ActivatedRoute, private taskService: TasksService, private navCtrl: NavController, private modalController: ModalController) { 
    this.task = {
      id: navParams.get('id'),
      title: '',
      description: '',
      priority: null,
      deadLine: null
    }
  }

  closeModal(){
    this.modalController.dismiss()
  }

  ngOnInit() {
    // let taskId = this.route.snapshot.paramMap.get('id')
    
    let taskId = this.task.id

    if(this.taskService.loaded){
      this.task = this.taskService.getTask(taskId)
    } else {
      this.taskService.load().then(() => {
        this.task = this.taskService.getTask(taskId)
      })
    }
  }

  modifyTask(reorder){
    this.taskService.save().then(() => {
      this.taskService.reorder()
    })
    
  }

  deleteTask(){
    console.log("esta es la tarea: ", this.task)
    this.taskService.deleteTask(this.task)
    this.navCtrl.navigateBack('/home')
  }
}
