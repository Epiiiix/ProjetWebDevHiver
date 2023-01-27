import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  error: boolean = false;
  user: User = { login: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  submit():void {
    this.userService.signin(this.user).subscribe({
      next : () => {
      this.router.navigate([''])
      },
      error: () => {
          this.error = true;
        }
      });
  }
}
