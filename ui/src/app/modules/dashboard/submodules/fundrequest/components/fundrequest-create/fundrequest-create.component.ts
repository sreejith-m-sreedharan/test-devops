import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ParsePipe } from 'ngx-moment';
import { RestApiService } from '../../../../../shared/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FirmType, FIRM_TYPES, FundManager, FUND_MANAGERS } from '../../../../models';

@Component({
  selector: 'app-fundrequest-create',
  templateUrl: './fundrequest-create.component.html',
  styleUrls: ['./fundrequest-create.component.less'],
})
export class FundrequestCreateComponent implements OnInit {
  public validateForm!: FormGroup;
  public validatePreviewForm!: FormGroup;
  public userprofile: any = {};
  public fundManagers: FundManager[] = FUND_MANAGERS;
  public id = 100;
  public referenceId;
  public firmTypes: FirmType[] = FIRM_TYPES;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private restApi: RestApiService,
    private notify: NzNotificationService,
    private route: ActivatedRoute
  ) {
    this.referenceId = this.route.snapshot.paramMap.get('refId');
  }
  resetPreviewForm() {
    this.validatePreviewForm.reset();
  }
  resetSubmitForm() {
    this.validateForm.reset();
    this.validateForm = null;
  }
  ngOnInit(): void {
    this.validatePreviewForm = this.fb.group({
      id: [null, []],
      fundManager: [null, [Validators.required]],
      fundReference: [null, [Validators.required]],
      requestSummary: [null, [Validators.required]],
    });
    this.restApi.getUserProfile(this.id).subscribe(
      (data: any) => {
        const profile = data;
        if (profile) {
          this.userprofile = profile;
          if (this.referenceId) {
            this.restApi.getFundRequest(this.referenceId).subscribe(
              (fund: any) => {
                this.validatePreviewForm.setValue({
                  id: fund.id || '',
                  fundManager: fund.publicEntity || '',
                  fundReference: fund.fundReference || '',
                  requestSummary: fund.description || '',
                });
                this.validateForm = this.fb.group({
                  id: [fund.id, []],
                  fundManager: [fund.publicEntity, [Validators.required]],
                  fundReference: [fund.fundReference, [Validators.required]],
                  requestSummary: [fund.description, [Validators.required]],
                  organizationName: [this.userprofile.name, [Validators.required]],
                  taxId: [this.userprofile.taxId, [Validators.required]],
                  firmType: [this.userprofile.firmType, [Validators.required]],
                  inBusinessSince: [
                    new ParsePipe().transform(this.userprofile.inBusinessSince, 'DD/MM/YYYY').toDate() || '',
                    [Validators.required],
                  ],
                  regId: [this.userprofile.registrationNo, [Validators.required]],
                  emailId: [this.userprofile.emailId, [Validators.required, Validators.email]],
                  contactType: [this.userprofile.organization ? 'Organization' : 'Individual', [Validators.required]],
                  address1: [this.userprofile.address1, [Validators.required]],
                  address2: [this.userprofile.address2, [Validators.required]],
                  address3: [this.userprofile.address3, [Validators.required]],
                  contactPerson: [this.userprofile.contactPerson, [Validators.required]],
                  contactNumber: [this.userprofile.contactNumber, [Validators.required]],
                });
              },
              () => {
                const notif = { title: 'Error!', msg: 'Unable to fetch fund request details!' };
                this.notify.error(notif.title, notif.msg, {});
              }
            );
          }
        }
      },
      () => {
        const notif = { title: 'Error!', msg: 'Unable to fetch profile details!' };
        this.notify.error(notif.title, notif.msg, {});
      }
    );
  }
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      if (this.referenceId) {
        this.updateFundRequest(this.validateForm);
      } else {
        this.createFundRequest(this.validateForm);
      }
    }
  }
  previewForm() {
    for (const i in this.validatePreviewForm.controls) {
      this.validatePreviewForm.controls[i].markAsDirty();
      this.validatePreviewForm.controls[i].updateValueAndValidity();
    }

    if (this.validatePreviewForm.valid) {
      if (this.userprofile) {
        this.validateForm = this.fb.group({
          id: [this.validatePreviewForm.controls.id.value, []],
          fundManager: [this.validatePreviewForm.controls.fundManager.value, [Validators.required]],
          fundReference: [this.validatePreviewForm.controls.fundReference.value, [Validators.required]],
          requestSummary: [this.validatePreviewForm.controls.requestSummary.value, [Validators.required]],
          organizationName: [this.userprofile.name, [Validators.required]],
          taxId: [this.userprofile.taxId, [Validators.required]],
          firmType: [this.userprofile.firmType, [Validators.required]],
          inBusinessSince: [
            new ParsePipe().transform(this.userprofile.inBusinessSince, 'DD/MM/YYYY').toDate(),
            [Validators.required],
          ],
          regId: [this.userprofile.registrationNo, [Validators.required]],
          emailId: [this.userprofile.emailId, [Validators.required, Validators.email]],
          contactType: [this.userprofile.organization ? 'Organization' : 'Individual', [Validators.required]],
          address1: [this.userprofile.address1, [Validators.required]],
          address2: [this.userprofile.address2, [Validators.required]],
          address3: [this.userprofile.address3, [Validators.required]],
          contactPerson: [this.userprofile.contactPerson, [Validators.required]],
          contactNumber: [this.userprofile.contactNumber, [Validators.required]],
        });
      } else {
        const notif = { title: 'Insufficient data!', msg: 'Company profile details missing!' };
        this.notify.error(notif.title, notif.msg, {});
      }
    }
  }
  createFundRequest(form) {
    const fundRequestDetails = {
      companyName: form.controls.organizationName.value,
      taxId: form.controls.taxId.value,
      firmType: form.controls.firmType.value,
      inBusinessSince: new DatePipe('en-US').transform(form.controls.inBusinessSince.value, 'dd/MM/yyyy'),
      registrationNo: form.controls.regId.value,
      emailId: form.controls.emailId.value,
      organization: form.controls.contactType.value === 'Organization' ? true : false,
      contactPerson: form.controls.contactPerson.value,
      contactNumber: form.controls.contactNumber.value,
      fundReference: form.controls.fundReference.value,
      address1: form.controls.address1.value,
      address2: form.controls.address2.value,
      address3: form.controls.address3.value,
      publicEntity: form.controls.fundManager.value,
      description: form.controls.requestSummary.value,
      status: 'Application Requested/Awaiting Response',
    };
    this.restApi.createFundRequest(fundRequestDetails).subscribe(
      (data: any) => {
        const notif = { title: 'Created!', msg: 'Successfully created fund request!' };
        this.notify.success(notif.title, notif.msg, {});
        this.router.navigateByUrl(`/dashboard/fund-request/view/${data.id}`);
      },
      () => {
        const notif = { title: 'Error!', msg: 'Something went wrong. Please retry!' };
        this.notify.error(notif.title, notif.msg, {});
      }
    );
  }
  updateFundRequest(form) {
    const fundRequestDetails = {
      id: form.controls.id.value,
      companyName: form.controls.organizationName.value,
      taxId: form.controls.taxId.value,
      firmType: form.controls.firmType.value,
      inBusinessSince: new DatePipe('en-US').transform(form.controls.inBusinessSince.value, 'dd/MM/yyyy'),
      registrationNo: form.controls.regId.value,
      emailId: form.controls.emailId.value,
      organization: form.controls.contactType.value === 'Organization' ? true : false,
      contactPerson: form.controls.contactPerson.value,
      contactNumber: form.controls.contactNumber.value,
      fundReference: form.controls.fundReference.value,
      address1: form.controls.address1.value,
      address2: form.controls.address2.value,
      address3: form.controls.address3.value,
      publicEntity: form.controls.fundManager.value,
      description: form.controls.requestSummary.value,
      status: 'Application Requested/Awaiting Response',
    };
    this.restApi.updateFundRequest(fundRequestDetails.id, fundRequestDetails).subscribe(
      (data: any) => {
        const notif = { title: 'Created!', msg: 'Successfully updated fund request!' };
        this.notify.success(notif.title, notif.msg, {});
        this.router.navigateByUrl(`/dashboard/fund-request/view/${data.id}`);
      },
      () => {
        const notif = { title: 'Error!', msg: 'Something went wrong. Please retry!' };
        this.notify.error(notif.title, notif.msg, {});
      }
    );
  }
}
