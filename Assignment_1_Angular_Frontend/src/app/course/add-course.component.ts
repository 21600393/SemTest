import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  courseForm = new FormGroup(
  {
      name: new FormControl(''),
      duration: new FormControl(''),
      description: new FormControl('')
  })

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['/courses'])
  }

  onSubmit(){
    this.dataService.addCourse(this.courseForm.value).subscribe(result => {
          this.router.navigate(['/courses'])
    })
  }
}
