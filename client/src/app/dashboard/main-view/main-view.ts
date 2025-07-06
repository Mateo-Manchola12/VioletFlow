import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Socket } from 'ngx-socket-io';

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

    this.http.get<{ message: string }>('http://localhost:3000/').subscribe({
      next: (response) => {
        this.httpMessage = response.message;
      },
    });

    this.http
      .get<{
        name: string;
        lastname: string;
        age: number;
      }>('http://localhost:3000/user')
      .subscribe({
        next: (response) => {
          this.user = response;
        },
      });
  }
}
