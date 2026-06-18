import { inject, Injectable } from '@angular/core';
import { AlertController, IonButton } from '@ionic/angular/standalone';


@Injectable({
  providedIn: 'root',
})
export class Alert {
  private alertController: AlertController = inject(AlertController);

  async showAlert(headerText: string, messageText: string) {
    const alert = await this.alertController.create({
      header: headerText,
      message: messageText,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmAlert(
    header: string,
    message: string,
    confirmText: string = 'Aceptar',
    cancelText: string = 'Cancelar',
    funcionOk: Function,
    
  )

  {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
        },
        {
          text: confirmText,
          role: 'confirm',
          handler: () => {
            funcionOk();
          }
        }
      ],
    });

    await alert.present();
  }
}
