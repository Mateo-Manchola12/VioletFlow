import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ApiResponse,
  ApiResponseStatus,
  UserAccount,
} from '@violetflow/types';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-main-view',
  templateUrl: './View.html',
})
export class View implements OnInit {
  websocketMessage!: string;
  httpMessage!: string;
  activeConections!: number;
  user!: UserAccount;

  constructor(
    private socket: Socket,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    // WebSocket listeners
    this.socket.on('message', (data) => {
      this.websocketMessage = data.message;
    });

    this.socket.on('active-connections', (data) => {
      this.activeConections = data.count;
    });

    this.http
      .get<ApiResponse>('http://localhost:3000/api/serverTesting')
      .subscribe({
        next: (response) => {
          const { message, status } = response;
          if (status === ApiResponseStatus.NoContent) {
            this.httpMessage = message || 'No content available';
          }
        },
      });

    this.http
      .get<
        ApiResponse<UserAccount>
      >('http://localhost:3000/api/serverTesting/user')
      .subscribe({
        next: (response) => {
          const { data, status, error } = response;

          if (status === ApiResponseStatus.Ok) {
            this.user = data;
          } else if (status >= 400) {
            this.httpMessage = `Error: ${error || 'Unknown error'}`;
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners('message');
    this.socket.removeAllListeners('active-connections');
  }
}
