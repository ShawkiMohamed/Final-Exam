import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: any;
  dataTable: any[] = [];
  constructor(private service: AuthService, private toaster: ToastrService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.service.getUsers('students').subscribe((res: any) => {
      for (let st in res) {
        if (res[st].subjects) {
          for (let sub in res[st].subjects) {
            this.dataTable.push({
              name: res[st].username,
              subjectName: res[st].subjects[sub].name,
              degree: res[st].subjects[sub].degree,
            });
          }
        } else {
          this.dataTable.push({
            name: res[st].username,
            subjectName: 'لم يختبر',
            degree: 'لم يختبر',
          });
        }
      }
      this.dataSource = this.dataTable;
      if (this.dataSource.length == 0) {
        this.toaster.warning('لا يوجد طلاب');
      }
    });
  }
}
