import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';

import { ProfileComponent } from './submodules/profile/components/profile.component';

import { FundrequestCreateComponent } from './submodules/fundrequest/components/fundrequest-create/fundrequest-create.component';
import { FundrequestViewComponent } from './submodules/fundrequest/components/fundrequest-view/fundrequest-view.component';
import { FundrequestVerifyComponent } from './submodules/fundrequest/components/fundrequest-verify/fundrequest-verify.component';
import { FundrequestVerifyListComponent } from './submodules/fundrequest/components/fundrequest-verify-list/fundrequest-verify-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'fund-request/create',
        component: FundrequestCreateComponent,
      },
      {
        path: 'fund-request/create/:refId',
        component: FundrequestCreateComponent,
      },
      {
        path: 'fund-request/view',
        component: FundrequestViewComponent,
      },
      {
        path: 'fund-request/view/:id',
        component: FundrequestViewComponent,
      },
      {
        path: 'fund-request/verify',
        component: FundrequestVerifyComponent,
      },
      {
        path: 'fund-request/verify-list',
        component: FundrequestVerifyListComponent,
      },
      { path: '**', redirectTo: 'profile' },
    ],
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
