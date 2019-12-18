import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { Task } from '../interfaces/task';
import { ArchiveAssistantService } from '../services/archive-assistant.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  @Input() id: string;

  public task: Task
  public archive: boolean

  constructor(navParams: NavParams, private route: ActivatedRoute, private taskService: TasksService, private navCtrl: NavController, 
    private modalController: ModalController, private archiveService: ArchiveAssistantService) { 
    this.task = {
      id: navParams.get('id'),
      title: '',
      description: '',
      priority: null,
      deadLine: null,
      color: '',
      tag: '',
      finished: false,
      finishDate: null
    },
    this.archive = false
  }

  closeModal(){
    console.log("este es el id de la tarea que estaba en el modal: ", this.task.id)
    console.log("tarea a eliminar? ", this.task)
    if(this.task.finished && !this.archive){
      this.task.finishDate = new Date(new Date().getDate())
      console.log("tarea a eliminar? ", this.task)
      this.archiveService.createTask(this.task)
      this.taskService.deleteTask(this.task)
    }
    this.modalController.dismiss()
  }

  ngOnInit() {
    // let taskId = this.route.snapshot.paramMap.get('id')
    
    let taskId = this.task.id
    if (this.archive){
      if(this.archiveService.loaded){
        this.task = this.archiveService.getTask(taskId)
      } else {
        this.archiveService.load().then(() => {
          this.task = this.archiveService.getTask(taskId)
        })
      }
    } else {
      if(this.taskService.loaded){
        this.task = this.taskService.getTask(taskId)
      } else {
        this.taskService.load().then(() => {
          this.task = this.taskService.getTask(taskId)
        })
      }
    }
    
  }

  modifyTask(){

    if (this.archive){
      this.archiveService.save().then(() => {
        this.archiveService.assingTag()
        this.archiveService.reorder()
      })
    } else {
      this.taskService.save().then(() => {
        this.taskService.assingTag()
        this.taskService.reorder()
      })
    }


    
    
  }

  deleteTask(){

    console.log("esta es la tarea: ", this.task)
    if (this.archive){
      this.archiveService.deleteTask(this.task)
      // this.navCtrl.navigateBack('/home')
      this.modalController.dismiss()
    } else {
      this.taskService.deleteTask(this.task)
      // this.navCtrl.navigateBack('/home')
      this.modalController.dismiss()
    }

   
    
  }
}
