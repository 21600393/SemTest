import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Course } from '../shared/course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  courseForm = new FormGroup(
    {
        name: new FormControl(''),
        duration: new FormControl(''),
        description: new FormControl('')
    })

  course:any
  constructor(private dataService: DataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getCourse(+this.route.snapshot.params['id']).subscribe(result => {
      this.course = result
      this.courseForm.patchValue({
        name: this.course.name,
        duration: this.course.duration,
        description: this.course.description
      });
  })
  }


  cancel(){
    this.router.navigate(['/courses'])
  }

  onSubmit(){
    this.dataService.editCourse(this.course.courseId, this.courseForm.value).subscribe(result => {
          this.router.navigate(['/courses'])
    })
  }

}
