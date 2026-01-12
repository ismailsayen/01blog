import { Component, inject } from '@angular/core';
import { BlogsComponent } from './components/blogs-component/blogs-component';
import { SuggestedUsers } from './components/suggested-users/suggested-users';


@Component({
  selector: 'app-home-component',
  imports: [BlogsComponent, SuggestedUsers],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

}
