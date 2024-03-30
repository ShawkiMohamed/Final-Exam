import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any;
  userLoggedInfo: any;
  studentData: any;
  totalDegree: number = 0;
  showResult: boolean = false;
  usersubjects: any[] = [];
  validExam: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private service: DoctorService,
    private toaster: ToastrService,
    private auth: AuthService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubject();
  }

  ngOnInit(): void {
    this.getUserLoggedInfo();
  }

  getSubject() {
    this.service.getSubjectById(this.id).subscribe((res) => {
      this.subject = res;
    });
  }

  getUserLoggedInfo() {
    this.auth.getRole().subscribe((res) => {
      this.userLoggedInfo = res;
      this.getUserData();
    });
  }

  getUserData() {
    this.auth.getStudent(this.userLoggedInfo.userId).subscribe((res: any) => {
      this.studentData = res;
      this.usersubjects = res.subjects ? res.subjects : [];
      this.checkValidExam();
    });
  }

  deleteItem(index: number) {
    this.subject.questions.splice(index, 1);
    const model = {
      name: this.subject.name,
      questions: this.subject.questions,
    };
    this.service.updateSubject(model, this.id).subscribe((res) => {
      this.toaster.success('تم حذف السؤال بنجاح');
    });
  }

  checkValidExam() {
    for (let x in this.usersubjects) {
      if (this.usersubjects[x].id == this.id) {
        this.totalDegree = this.usersubjects[x].degree;
        this.validExam = false;
        this.toaster.warning('لقد انجزت هذا الاختبار مسبقا');
      }
    }
  }

  getAnswer(event: any) {
    let choosenValue = event.value,
      questionIndex = event.source.name;
    this.subject.questions[questionIndex].studenAnswer = choosenValue;
  }

  getResult() {
    this.totalDegree = 0;
    for (let x in this.subject.questions) {
      if (
        this.subject.questions[x].studenAnswer ==
        this.subject.questions[x].correctAnswer
      ) {
        this.totalDegree++;
      }
    }
    this.showResult = true;
    this.usersubjects.push({
      name: this.subject.name,
      id: this.id,
      degree: this.totalDegree,
    });
    const model = {
      username: this.studentData.username,
      email: this.studentData.email,
      password: this.studentData.password,
      subjects: this.usersubjects,
    };

    this.auth
      .updateStudent(this.userLoggedInfo.userId, model)
      .subscribe((res) => {
        this.toaster.success('تم تسجيل النتيجة بنجاح');
      });
  }
}
