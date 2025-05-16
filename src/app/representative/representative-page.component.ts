import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideBarRepresentativeComponent} from './pages/side-bar/side-bar.component';

@Component({
  selector: 'app-representative-page',
  imports: [
    SideBarRepresentativeComponent
  ],
  templateUrl: './representative-page.component.html',
  styleUrl: './representative-page.component.css'
})
export class RepresentativePageComponent {

}
