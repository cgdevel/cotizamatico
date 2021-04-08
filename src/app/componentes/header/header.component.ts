import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../core/Constantes';
import { SecureStorageServiceService } from '../../core/secure-storage-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sesion: any;

  constructor(private storageService: SecureStorageServiceService) {}

  ngOnInit(): void {
    const sesion = this.storageService.getJsonValue(
      Constantes.sesiones.datosSesion
    );
    console.log(sesion);
    if (sesion === null || sesion === undefined) {
      alert('La sesión no se ha iniciado');
    } else {
      this.sesion = sesion;
    }
  }
}
