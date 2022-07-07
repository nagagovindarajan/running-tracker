import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoutePlotComponent} from './route-plot/route-plot.component';

const routes: Routes = [
  {path: '', component: RoutePlotComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
