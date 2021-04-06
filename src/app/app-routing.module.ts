import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Pagina1Component } from './componentes/pagina1/pagina1.component';
import { Pagina2Component } from './componentes/pagina2/pagina2.component';
import { VermasComponent } from './componentes/vermas/vermas.component';
import { Pagina3Component } from './componentes/pagina3/pagina3.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/selecciona',
        pathMatch: 'full',
      },
      {
        path: 'selecciona',
        component: Pagina1Component,
      },
      {
        path: 'compara',
        component: Pagina2Component,
      },
      {
        path: 'vermas',
        component: VermasComponent,
      },
      {
        path: 'contrata',
        component: Pagina3Component,
      },
    ],
  },
  {
    path: 'autos/:UserId',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
