import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ApiResponse, ApiResponseStatus } from '@violetflow/types';

@Component({
  selector: 'app-main-view',
  imports: [RouterOutlet],
  templateUrl: './main-view.html',
})
export class MainView implements OnInit {
  websocketMessage!: string;
  httpMessage!: string;
  activeConections!: number;
  user!: { name: string; lastname: string; age: number };

  constructor(
    private socket: Socket,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.socket.on('message', (data) => {
      this.websocketMessage = data.message;
    });

    this.socket.on('active-connections', (data) => {
      this.activeConections = data.count;
    });

    this.http.get<ApiResponse>('http://localhost:3000/').subscribe({
      next: ({ message, status }) => {
        if (status === ApiResponseStatus.SuccessNoData)
          this.httpMessage = message;
      },
    });

    this.http
      .get<
        ApiResponse<{ name: string; lastname: string; age: number }>
      >('http://localhost:3000/user')
      .subscribe({
        next: ({ data, status }) => {
          if (status === ApiResponseStatus.SuccessWithData) {
            this.user = data;
          }
        },
      });
  }
}
