import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfovehiculoService } from '../servicios/infovehiculo.service';
import { Constantes } from '../core/Constantes';
import { SecureStorageServiceService } from '../core/secure-storage-service.service';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InfovehiculoService,
    private storageService: SecureStorageServiceService
  ) {}

  ngOnInit(): void {
    this.usuario = '';

    this.getAplicacionesId();

    this.route.params.subscribe((p) => {
      console.log(p);
      this.usuario = p.UserId;
      this.IniciarSesionMinisitio();
    });

    // this.getCotizacionEjemploMapfre();
  }

  IniciarSesionMinisitio() {
    const apps = this.storageService.getJsonValue(Constantes.sesiones.appsId);
    console.log(apps);

    if (this.usuario.toLowerCase() === 'login') {
      return;
    }

    this.service
      .getInicioSesion({
        iIdSistema: apps.find((x) => x.sAplicacion === 'Cotizamaticos')
          .iIdAplicacion,
        sNombreCredencial: this.usuario,
      })
      .subscribe(
        (result) => {
          if (result.Success !== undefined) {
            console.log('Error: Inicio Sesión');
            console.log(result.Message);
            alert('Error de inicio de sesión');
          }

          this.storageService.setJsonValue(
            Constantes.sesiones.datosSesion,
            result
          );

          this.router.navigate(['/']);
        },
        (err) => {
          alert('Error de inicio de sesión');
        }
      );
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
