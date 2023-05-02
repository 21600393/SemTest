import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Course } from 'src/app/shared/course';

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss']
})
export class EditcourseComponent implements OnInit {

  courseId: number = 0;
  course!: Course;

  // Create a FormGroup with form controls and validation rules
  editCourseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Get the course ID from the route parameters
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
    });
  }

  ngOnInit(): void {
    // Fetch the course data from the API
    this.dataService.GetCourse(this.courseId).subscribe((course: Course) => {
      this.course = course;

      // Update the form controls with the fetched course data
      this.editCourseForm.patchValue(course);
    });
  }

  updateCourse() {
    // Check if the form is valid
    if (this.editCourseForm.valid) {
      // Combine the original course data with the updated form values
      const updatedCourse: Course = {
        ...this.course,
        ...this.editCourseForm.value,
      };

      // Call the DataService to update the course in the API
      this.dataService.UpdateCourse(this.course.courseId, updatedCourse).subscribe(() => {
        // Navigate back to the home page after successful update
        this.router.navigate(['/courses']);
      });
    }
  }
}
