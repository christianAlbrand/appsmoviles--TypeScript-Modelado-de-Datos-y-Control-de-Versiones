import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonList, IonIcon, IonItemSliding, IonReorder, IonReorderGroup, IonItemOptions, IonItemOption} from '@ionic/angular/standalone';
import { ReorderEndCustomEvent } from '@ionic/angular';
import { Task } from '../../models/task.models';
import {addIcons} from 'ionicons';
import {addOutline, addCircleOutline, trashOutline} from 'ionicons/icons';
import { Alert } from 'src/app/services/alert';
import {Preferences} from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, IonList, IonIcon, IonItemSliding, IonReorder, IonReorderGroup, IonItemOptions, IonItemOption]
})
export class HomePage implements OnInit {

  newTaskStr: string = '';
  public alertService: Alert = inject(Alert);
  private readonly KEY_TASKS = 'local_key_task';

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
      addCircleOutline,
      trashOutline,
    });
    console.log(this.tasks);
  }

  async addTask() {
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
    await this.saveTaskOnLocal();
    console.log(this.tasks);
    this.alertService.showAlert('Tarea agregada', `La tarea "${newTask.titulo}" ha sido agregada exitosamente.`);
    this.newTaskStr = '';
  }

  async deleteTask(taskRemove: Task) {
    const index = this.tasks.findIndex(task => task.id === taskRemove.id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      await this.saveTaskOnLocal();
    }
  }

  confirmDelete(task: Task){
    this.alertService.confirmAlert(
      'Aviso',
      `Desea borrar la tarea ${task.titulo}`,
      'SI',
      'NO',
      () => this.deleteTask(task)
    );
  }

  actualizarPosiciones(event: ReorderEndCustomEvent) {
    console.log("El arreglo antes de reordenar:", this.tasks);
    this.tasks = event.detail.complete(this.tasks);
    this.saveTaskOnLocal();
    console.log("El arreglo después de reordenar:", this.tasks);
  }

  async ionViewWillEnter() {
    const taskPreferences = await Preferences.get({ key: this.KEY_TASKS });
    if (taskPreferences.value) {
      const tasks = JSON.parse(taskPreferences.value);
      if (Array.isArray(tasks)) {
        this.tasks = tasks;
      }
    }
  }

  async saveTaskOnLocal(){
    await Preferences.set({
      key: this.KEY_TASKS,
      value: JSON.stringify(this.tasks)
    });
  }
  
  

  ngOnInit() {
  }

  saludar() {
    console.log("¡Hola, Ionic!");
  }

}
