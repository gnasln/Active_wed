import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndividualTaskComponent } from './individual-task.component';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: IndividualTaskComponent,
    // canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'list',
    //     pathMatch: 'full',
    //   },
    //   {
    //     path: 'list',
    //     component: UnitListComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndividualTaskRoutingModule {}
