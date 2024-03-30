import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  type: string = 'students';
  usersData: any[] = [];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private service: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.getData();
  }

  getRole(event: any) {
    this.type = event.value;
    this.getData();
  }

  getData() {
    this.service.getUsers(this.type).subscribe((res: any) => {
      this.usersData = res;
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      type: [this.type],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    let index = this.usersData.findIndex(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );
    if (index == -1) {
      this.toaster.error('الايميل او كلمة المرور غير صحيحة', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
    } else {
      const model = {
        username: this.usersData[index].username,
        role: this.type,
        userId: this.usersData[index].id,
      };
      this.service.login(model).subscribe((res) => {
        this.service.user.next(res);
        this.toaster.success('تم تسجيل الدخول بنجاح', '', {
          disableTimeOut: false,
          titleClass: 'toastr_title',
          messageClass: 'toastr_message',
          timeOut: 5000,
          closeButton: true,
        });
        this.router.navigate(['/subjects']);
      });
    }
  }
}
