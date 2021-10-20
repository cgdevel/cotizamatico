import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginByJson } from 'src/app/actions/login.actions';
import { Constantes } from '../../core/Constantes';
import { SecureStorageServiceService } from '../../core/secure-storage-service.service';
import * as fromRoot from '../../reducers'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sesion: any;

  constructor(
    private storageService: SecureStorageServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    const sesion = this.storageService.getJsonValue(
      Constantes.sesiones.datosSesion
    );
    if (sesion === null || sesion === undefined) {
      alert('No se ha iniciado una sesión');
      // Se lo agregue para corregir error en tooltips
      this.sesion = { FriendlyName: 'Invitado' };
      // this.router.navigate(['/autos/login']);
    } else {
      this.sesion = sesion;
      this.store.dispatch(new LoginByJson(this.sesion))
    }
  }
}
