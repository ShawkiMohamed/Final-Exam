import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  subjects: any[] = [];
  userInfo: any;
  constructor(
    private service: DoctorService,
    private auth: AuthService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSubjects();
    this.getUserInfo();
  }

  getSubjects() {
    this.service.getAllSubjects().subscribe((res: any) => {
      this.subjects = res;
    });
  }

  getUserInfo() {
    this.auth.getRole().subscribe((res) => {
      this.userInfo = res;
    });
  }

  deleteSubject(index: number) {
    let id = this.subjects[index].id;
    this.subjects.splice(index, 1);
    this.service.deleteSubject(id).subscribe((res) => {
      this.toaster.success('تم حذف المادة بنجاح');
    });
  }
}
