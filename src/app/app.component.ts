import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from '../Components/header/header.component';
import { SidebarComponent } from '../Components/sidebar/sidebar.component';
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { HomeComponent } from '../Components/home/home.component';
import { GenreComponent } from '../Components/genre/genre.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, NavbarComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebarComponent, HomeComponent, GenreComponent]
})
export class AppComponent {
  title = 'NoveLuxe';
}
