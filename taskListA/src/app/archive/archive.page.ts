import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import {TaskPage} from '../task/task.page'
import { ArchiveAssistantService } from '../services/archive-assistant.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public archiveService: ArchiveAssistantService, private modalController: ModalController) { }

  async presentModal(id, value) {
    console.log("valor que llego: ", id)
    const modal = await this.modalController.create({
      component: TaskPage,
      componentProps: {
        'id': id, 
        archive: value
      }
      
    });
    return await modal.present();
  }

  ngOnInit(){
    this.archiveService.load()
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
            this.archiveService.createTask(data)
            this.archiveService.reorder()
          }
        }
      ]
    }).then((alert) => {
      alert.present()
    })
  }


}
