import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AuthenticationService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard  {

    constructor(private router: Router,
        private notificationService: NotificationService,
        private authService: AuthenticationService) { }

    canActivate() {
     

        if (this.authService.getToken()) {

                return true;
        }
        this.router.navigate(['auth/login']);
        return false;
    }
}
