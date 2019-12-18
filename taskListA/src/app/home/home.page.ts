import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import {TasksService } from '../services/tasks.service'
import {TaskPage} from '../task/task.page'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public taskService: TasksService, private modalController: ModalController) { }

  async presentModal(value) {
    console.log("valor que llego: ", value)
    const modal = await this.modalController.create({
      component: TaskPage,
      componentProps: {
        'id': value
      }
      
    });
    return await modal.present();
  }

  ngOnInit(){
    this.taskService.load()
  }

  addtask(){
    this.alertCtrl.create({
      header: 'Nueva Tarea',
      message: 'Cuentanos más detalles sobre esa tarea tuya',
      inputs:[
        {
          type: 'text',
          name: 'title',
          placeholder: 'Titulo'
        },
        {
          type: 'text',
          name: 'description',
          placeholder: 'Descripción'
        },
        {
          type: 'number',
          name: 'priority',
          placeholder: 'minima 1, máxima 10',
          min: 1,
          max: 10
        },
        {
          type: 'date',
          name: 'deadLine',
          placeholder: 'Fecha Límite'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            console.log(data)
            this.taskService.createTask(data)
            this.taskService.reorder()
          }
        }
      ]
    }).then((alert) => {
      alert.present()
    })
  }


}
