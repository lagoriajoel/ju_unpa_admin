import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserListComponent, AddUserComponent]
})
export class UsersModule { }
