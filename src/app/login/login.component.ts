import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfovehiculoService } from '../servicios/infovehiculo.service';
import { Constantes } from '../interphaces/Constantes';
import { SecureStorageServiceService } from '../core/secure-storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: string;

  constructor(
    private route: ActivatedRoute,
    private service: InfovehiculoService,
    private storageService: SecureStorageServiceService
  ) {}

  ngOnInit(): void {
    this.usuario = '';

    this.route.params.subscribe((p) => {
      this.usuario = p.UserId;
      this.IniciarSesionMinisitio();
    });

    this.getAplicacionesId();
    this.getCotizacionEjemploMapfre();
  }

  IniciarSesionMinisitio() {
    console.log(this.usuario);
  }

  getAplicacionesId() {
    const apps = this.storageService.getJsonValue(Constantes.sesiones.appsId);
    if (apps === null) {
      console.log('primera vez');
      this.service.getApiAplicacionesId().subscribe(
        (cat) => {
          if (!cat.Success) {
            console.log('Error: Compañias');
            console.log(cat.Message);
          }

          this.storageService.setJsonValue(
            Constantes.sesiones.appsId,
            cat.aplicacionesId
          );
        },
        (err) => {
          console.log('Error: Catálogos Tipo de Vehículo');
          console.log(err.message);
        }
      );
    }
  }

  getCotizacionEjemploMapfre() {
    this.service.getOneCotizacion().subscribe(
      (cat) => {
        console.log(cat);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
