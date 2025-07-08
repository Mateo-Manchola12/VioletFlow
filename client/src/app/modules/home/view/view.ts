import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse, ApiResponseStatus } from '@violetflow/types';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-main-view',
  templateUrl: './View.html',
})
export class View implements OnInit {
  websocketMessage!: string;
  httpMessage!: string;
  activeConections!: number;
  user!: { name: string; lastname: string; age: number };

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
        next: ({ message, status }) => {
          if (status === ApiResponseStatus.SuccessNoData) {
            this.httpMessage = message;
          }
        },
      });

    this.http
      .get<
        ApiResponse<{ name: string; lastname: string; age: number }>
      >('http://localhost:3000/api/serverTesting/user')
      .subscribe({
        next: ({ data, status }) => {
          if (status === ApiResponseStatus.SuccessWithData) {
            this.user = data;
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners('message');
    this.socket.removeAllListeners('active-connections');
  }
}
