import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestApiService } from '../../../../../shared/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-fundrequest-view',
  templateUrl: './fundrequest-view.component.html',
  styleUrls: ['./fundrequest-view.component.less'],
})
export class FundrequestViewComponent implements OnInit {
  public fundRequests: any = [];
  public filteredFundRequests: any = [];
  public selectedId;
  public enableFilter = false;
  public showAllFundRequests = true;
  constructor(private route: ActivatedRoute, private router: Router, private restApi: RestApiService) {}

  ngOnInit(): void {
    this.restApi.getFundRequests().subscribe((data: any) => {
      this.fundRequests = data;
      this.selectedId = this.route.snapshot.paramMap.get('id');

      if (this.selectedId) {
        this.enableFilter = true;
        this.showAllFundRequests = false;
        this.toggleShowFundRequests();
      } else {
        this.toggleShowFundRequests();
      }
    });
  }
  createFundRequest() {
    this.router.navigateByUrl('/dashboard/fund-request/create');
  }
  updateFundRequest(fundRequest) {
    this.router.navigateByUrl(`/dashboard/fund-request/create/${fundRequest.id}`);
  }
  toggleShowFundRequests() {
    if (!this.showAllFundRequests) {
      this.filteredFundRequests = this.fundRequests.filter((fund) => fund.id == this.selectedId);
      this.showAllFundRequests = true;
    } else {
      this.filteredFundRequests = this.fundRequests;
      this.showAllFundRequests = false;
    }
  }
}
