import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import * as submodules from './submodules';

@NgModule({
  declarations: [DashboardComponent, ...submodules.components],
  imports: [SharedModule, DashboardRoutingModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
