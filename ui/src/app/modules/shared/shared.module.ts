import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClickOutsideModule } from 'ng-click-outside';

import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTableModule } from 'ng-zorro-antd/table';

import { MomentModule } from 'ngx-moment';

import { services } from './services';
const sharedModules = [
  MomentModule,
  ScrollingModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NzNotificationModule,
  NzAlertModule,
  IconsProviderModule,
  ClickOutsideModule,
  NzCardModule,
  NzLayoutModule,
  NzMenuModule,
  NzAffixModule,
  NzRadioModule,
  NzFormModule,
  NzInputModule,
  NzUploadModule,
  NzSelectModule,
  NzButtonModule,
  NzAvatarModule,
  NzPopoverModule,
  NzDatePickerModule,
  NzTableModule,
  NzCheckboxModule,
  NzDividerModule,
  NzModalModule,
  NzBreadCrumbModule,
  NzPageHeaderModule,
  NzDropDownModule,
  NzSwitchModule,
];
@NgModule({
  declarations: [],
  imports: sharedModules,
  exports: [...sharedModules],
  providers: [...services],
})
export class SharedModule {}
