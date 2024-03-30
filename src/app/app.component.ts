import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app1';

  constructor(private service: AuthService) {}
  ngOnInit() {
    this.getUserData();
  }
  getUserData() {
    this.service.getRole().subscribe((res) => {
      this.service.user.next(res);
    });
  }
}
