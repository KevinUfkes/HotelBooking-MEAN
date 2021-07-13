import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'id101197364-comp3133-assig2';
  isLoggedIn = false;
  user_id : any;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isValid();
    console.log(`Status: ${this.isLoggedIn}`);
    this.user_id = this.authenticationService.getUserId();
  }

}
