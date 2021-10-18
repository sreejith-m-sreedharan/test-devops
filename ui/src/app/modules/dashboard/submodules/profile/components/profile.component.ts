import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { ParsePipe } from 'ngx-moment';
import { DatePipe } from '@angular/common';
import { FirmType, FIRM_TYPES } from '../../../models';

import { RestApiService } from '../../../../shared/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  public validateForm!: FormGroup;

  public firmTypes: FirmType[] = FIRM_TYPES;

  public fileList: NzUploadFile[] = [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ];

  id = 100;

  @ViewChild('notification', { static: false }) notiftemplate?: TemplateRef<{}>;

  constructor(private fb: FormBuilder, private restApi: RestApiService, private notify: NzNotificationService) {}
  formReset() {
    this.validateForm.reset();
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      organizationName: [null, [Validators.required]],
      taxId: [null, [Validators.required]],
      firmType: [null, [Validators.required]],
      inBusinessSince: [null, [Validators.required]],
      regId: [null, [Validators.required]],
      emailId: [null, [Validators.required, Validators.email]],
      contactType: ['Individual', [Validators.required]],
      address1: [null, [Validators.required]],
      address2: [null, [Validators.required]],
      address3: [null, [Validators.required]],
      contactPerson: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]],
    });
    this.restApi.getUserProfile(this.id).subscribe(
      (data: any) => {
        const profile = data;
        if (profile) {
          this.validateForm.setValue({
            organizationName: profile.name,
            taxId: profile.taxId,
            firmType: profile.firmType,
            inBusinessSince: new ParsePipe().transform(profile.inBusinessSince, 'DD/MM/YYYY').toDate() || '',
            regId: profile.registrationNo,
            emailId: profile.emailId,
            contactType: profile.organization ? 'Organization' : 'Individual',
            address1: profile.address1,
            address2: profile.address2,
            address3: profile.address3,
            contactPerson: profile.contactPerson,
            contactNumber: profile.contactNumber,
          });
        }
      },
      () => {
        /* const notif = { title: 'Error!', msg: 'Unable to fetch profile details!' };
        this.notify.error(notif.title, notif.msg, {});*/
      }
    );
  }
  onBack() {
    window.history.go(-1);
  }
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.createUserProfile(this.validateForm);
    }
  }
  createUserProfile(form) {
    const profileCreateDetails: any = {
      id: this.id,
      name: form.controls.organizationName.value,
      taxId: form.controls.taxId.value,
      firmType: form.controls.firmType.value,
      inBusinessSince: new DatePipe('en-US').transform(form.controls.inBusinessSince.value, 'dd/MM/yyyy'),
      registrationNo: form.controls.regId.value,
      emailId: form.controls.emailId.value,
      organization: form.controls.contactType.value === 'Organization' ? true : false,
      contactPerson: form.controls.contactPerson.value,
      contactNumber: form.controls.contactNumber.value,
      address1: form.controls.address1.value,
      address2: form.controls.address2.value,
      address3: form.controls.address3.value,
    };
    this.restApi.createUserProfile(profileCreateDetails).subscribe(
      (data: any) => {
        const notif = { title: 'Created!', msg: 'Successfully created profile!' };
        this.notify.success(notif.title, notif.msg, {});
      },
      () => {
        const notif = { title: 'Error!', msg: 'Something went wrong. Please retry!' };
        this.notify.error(notif.title, notif.msg, {});
      }
    );
  }
  convertToTimeStamp(date: string): number {
    return new Date(date).getTime();
  }
  handleOk() {
    this.validateForm.clearValidators();
  }
  handleCancel() {
    this.validateForm.clearValidators();
  }
}
