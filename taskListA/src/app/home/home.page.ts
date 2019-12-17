import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  tasks = [
    {
      "id": 0,
      "title": "mi primera tareita :v",
      "description": "hacer una segunda tarea",
      "priority": 1,
      "deadLine": "17/12/2019",
    },
    {
      "id": 1,
      "title": "Second Task",
      "description": "Es como avanzar en la vida :') ¿Qué tal una tercera?",
      "priority": 2,
      "deadLine": "17/12/2019",
    },
    {
      "id": 2,
      "title": "Tercera tarea, jijiji",
      "description": "Celebrar",
      "priority": 3,
      "deadLine": "17/12/2019",
    }
  ] 

}
