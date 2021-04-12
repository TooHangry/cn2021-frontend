import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './routes/users/users.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { ChatsComponent } from './routes/chats/chats.component';
import { GroupsComponent } from './routes/groups/groups.component';
import { LoginComponent } from './routes/login/login.component';
import { MessageListComponent } from './shared/message-list/message-list.component';
import { MessageComponent } from './shared/messages/message/message.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { ProfileWidgetComponent } from './shared/profile-widget/profile-widget.component';
import { FriendListComponent } from './shared/friend-list/friend-list.component';
import { OpenChatComponent } from './shared/open-chat/open-chat.component';
import { CreateGroupComponent } from './routes/groups/create-group/create-group.component';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProfileComponent,
    ChatsComponent,
    GroupsComponent,
    LoginComponent,
    MessageListComponent,
    MessageComponent,
    ToolbarComponent,
    ProfileWidgetComponent,
    FriendListComponent,
    OpenChatComponent,
    CreateGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
