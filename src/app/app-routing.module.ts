import { NgModule } from '@angular/core';
import { Routes, RouterModule , PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Pagina1Component } from './componentes/pagina1/pagina1.component';
import { Pagina2Component } from './componentes/pagina2/pagina2.component';
import { VermasComponent} from './componentes/vermas/vermas.component';


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
        component:  VermasComponent,
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}