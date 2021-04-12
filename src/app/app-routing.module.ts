import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChatsComponent } from './routes/chats/chats.component';
import { GroupsComponent } from './routes/groups/groups.component';
import { LoginComponent } from './routes/login/login.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { UsersComponent } from './routes/users/users.component';

const routes: Routes = [
  { path: 'chats', component: ChatsComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  { path: 'me', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/chats', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: '**', component: ChatsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
