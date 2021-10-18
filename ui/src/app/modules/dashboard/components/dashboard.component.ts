import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { UtilService } from '../../shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  public isCollapsed: Boolean = true;
  public darkThemeSwitcher: Boolean = false;
  public darkTheme: Boolean = false;
  public contentPanelWidth;
  public disableClickOutSide: Boolean = false;
  @ViewChild('content') content: any;
  constructor(private router: Router, private notify: NzNotificationService, private util: UtilService) {}

  ngOnInit() {
    this.darkTheme = sessionStorage.darkTheme === 'true' || false;
    this.darkThemeSwitcher = this.darkTheme;
    this.changeTheme();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.content.elementRef.nativeElement.scrollTo(0, 0);
    });
    this.menuChanged();
  }
  menuChanged() {
    if (this.isCollapsed) {
      this.contentPanelWidth = 'auto';
    } else {
      this.contentPanelWidth = 'auto';
    }
  }
  triggerCollapse() {
    this.disableClickOutSide = true;
    this.isCollapsed = !this.isCollapsed;
    this.menuChanged();
    setTimeout(() => {
      this.disableClickOutSide = false;
    }, 500);
  }

  changeTheme(): void {
    let styleLink: any = document.getElementById('theme-style');
    if (styleLink) {
      if (this.darkThemeSwitcher) {
        const href = '../../../../assets/themes/theme.dark.min.css';
        this.util.checkAvailable(href).subscribe(
          (data) => {
            styleLink.href = href;
            this.darkTheme = this.darkThemeSwitcher;
            sessionStorage.setItem('darkTheme', this.darkTheme + '');
          },
          (error) => {
            const notif = { title: 'Unable to change theme!', msg: 'Unable to connect to server!' };
            this.notify.error(notif.title, notif.msg, {});
            this.darkThemeSwitcher = !this.darkThemeSwitcher;
          }
        );
      } else {
        const href = '../../../../assets/themes/theme.light.min.css';
        this.util.checkAvailable(href).subscribe(
          (data) => {
            styleLink.href = href;
            this.darkTheme = this.darkThemeSwitcher;
            sessionStorage.setItem('darkTheme', this.darkTheme + '');
          },
          (error) => {
            const notif = { title: 'Unable to change theme!', msg: 'Unable to connect to server!' };
            this.notify.error(notif.title, notif.msg, {});
            this.darkThemeSwitcher = !this.darkThemeSwitcher;
          }
        );
      }
    } else {
      // If it does not exist, create a new one
      styleLink = document.createElement('link');
      styleLink.type = 'text/css';
      styleLink.rel = 'stylesheet';
      styleLink.id = 'theme-style';
      if (this.darkThemeSwitcher) {
        styleLink.href = '../../../../assets/themes/theme.dark.min.css';
      } else {
        styleLink.href = '../../../../assets/themes/theme.light.min.css';
      }
      this.darkTheme = this.darkThemeSwitcher;
      sessionStorage.setItem('darkTheme', this.darkTheme + '');
      document.body.append(styleLink);
    }
  }
  onClickedOutside(event) {
    if (!this.disableClickOutSide && this.util.isMobile()) {
      console.log('clicked outside');
      this.isCollapsed = true;
      this.menuChanged();
    }
  }
}
