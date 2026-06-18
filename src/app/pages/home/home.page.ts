import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonList, IonIcon} from '@ionic/angular/standalone';
import { Task } from '../../models/task.models';
import {addIcons} from 'ionicons';
import {addOutline, addCircleOutline} from 'ionicons/icons';
import { Alert } from 'src/app/services/alert';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, IonList, IonIcon]
})
export class HomePage implements OnInit {

  newTaskStr: string = '';
  public alertService: Alert = inject(Alert);

  tasks: Task[] = [
    {
      id: 1,
      titulo: "Configuración de Ionic",
      descripcion: "Instalar Node.js, AngularCli, Ionic",
      finalizado: true,
      prioridad: "Alta"
    },
    {
      id: 2,
      titulo: "Crear app tasklist",
      descripcion: "Crear el proyecto inicial de Ionic con Angular",
      finalizado: false,
      prioridad: "Media"
    }
  ];

  constructor() { 
    addIcons({
      addOutline,
      addCircleOutline
    });
    console.log(this.tasks);
  }

  addTask() {
    console.log(this.newTaskStr);
    const newTask: Task = {
      id: Date.now(),
      titulo: this.newTaskStr,
      descripcion: '',
      finalizado: false,
      prioridad: "Media"
    };
    if (this.newTaskStr === '') {
      this.newTaskStr = '';
      return console.warn('El titulo de la tarea no puede estar vacio');
    }

    if (this.newTaskStr !== this.newTaskStr.trim()) {
      return console.warn('El titulo no puede empezar ni terminar con espacios');
    }

    if (this.tasks.some(task => task.titulo.toLocaleLowerCase() === this.newTaskStr.toLocaleLowerCase())) {
      this.newTaskStr = '';
      return console.warn('Ya existe una tarea con ese titulo');
    }

    this.tasks.push(newTask);
    console.log(this.tasks);
    this.alertService.showAlert('Tarea agregada', `La tarea "${newTask.titulo}" ha sido agregada exitosamente.`);
    this.newTaskStr = '';
  }

  confirmDelete(task:string){
    console.log('Confirmacion para borrar la task: ${task}');
  }

  ngOnInit() {
  }

  saludar() {
    console.log("¡Hola, Ionic!");
  }

}
