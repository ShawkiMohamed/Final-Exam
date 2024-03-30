import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss'],
})
export class NewExamComponent implements OnInit {
  name = new FormControl('');
  questionForm!: FormGroup;
  qusetions: any[] = [];
  correctAns: any;
  nextTab: boolean = false;
  subjectName: any;
  preView: boolean = false;
  questionId!: number;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private service: DoctorService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
    });
  }

  getCorrect(event: any) {
    this.correctAns = event.value;
  }
  createQuestion() {
    if (this.correctAns) {
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctAns],
      };
      this.qusetions.push(model);
      this.questionForm.reset();
    } else {
      this.toaster.error('يرجى اختيار الاجابة الصحيحة');
    }
  }

  start() {
    if (this.name.value == '') {
      this.toaster.error('يرجى كتابة اسم المادة ');
    } else {
      this.nextTab = true;
      this.subjectName = this.name.value;
    }
  }
  clearForm() {
    this.questionForm.reset();
  }
  clearSubject() {
    this.qusetions = [];
    this.subjectName = '';
    this.name.reset();
    this.nextTab = false;
  }

  submit() {
    const model = {
      name: this.subjectName,
      questions: this.qusetions,
    };

    this.service.createSubject(model).subscribe((res: any) => {
      this.preView = true;
      this.questionId = res.id;
    });
  }

  deleteItem(index: number) {
    this.qusetions.splice(index, 1);
    const model = {
      name: this.subjectName,
      questions: this.qusetions,
    };
    this.service.updateSubject(model, this.questionId).subscribe((res) => {
      this.toaster.success('تم حذف السؤال بنجاح');
    });
  }
}
