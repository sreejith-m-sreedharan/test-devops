import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import * as login from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [...login.components],
  exports: [],
})
export class AuthModule {}
