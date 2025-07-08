import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Header } from '../components/header/header';
import { Nav } from '../components/nav/nav';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-main-view',
  imports: [RouterOutlet, RouterLink, Header, Nav, Footer],
  templateUrl: './main-view.html',
})
export class MainView {}
