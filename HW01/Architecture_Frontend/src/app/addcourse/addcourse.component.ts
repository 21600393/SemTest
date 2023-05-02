import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Course } from 'src/app/shared/course';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddCourseComponent implements OnInit {
  // Create a FormGroup instance for the addCourseForm using FormControl instances
  // for each form field with their respective validators
  addCourseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]), // FormControl for 'name' with a required validator
    duration: new FormControl('', [Validators.required]), // FormControl for 'duration' with a required validator
    description: new FormControl('', [Validators.required]) // FormControl for 'description' with a required validator
  });

  // Inject the DataService and Router services into the constructor
  constructor(private dataService: DataService, private router: Router) {}

  // ngOnInit lifecycle hook, empty in this case
  ngOnInit(): void {}

  // Function to handle form submission
  onSubmit() {
    // Check if the form is valid using the custom validateForm method
    const isValid = this.validateForm();

    // If the form is valid, proceed with form submission
    if (isValid) {
      // Create a new Course instance and populate it with form values
      const newCourse = new Course();
      newCourse.name = this.addCourseForm.value.name;
      newCourse.description = this.addCourseForm.value.description;
      newCourse.duration = this.addCourseForm.value.duration;

      // Call the DataService's AddCourse method to submit the new course data
      this.dataService.AddCourse(newCourse).subscribe((response: any) => {
        // If the response has a successful status code, navigate to the '/courses' route
        if (response.statusCode === 200) {
          this.router.navigate(['/courses']);
        } else {
          // Show an alert with the response message in case of an error
          alert(response.message);
        }
      });
    }
  }

  // Function to validate the form by checking the validity of each form control
  private validateForm(): boolean {
    let formIsValid = true;

    // Loop through each form control in the addCourseForm
    Object.values(this.addCourseForm.controls).forEach((control: AbstractControl) => {
      // If the control is invalid, mark it as dirty and update its validity
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });

        // Set formIsValid to false if any control is invalid
        formIsValid = false;
      }
    });

    // Return the formIsValid value (true if all controls are valid, false otherwise)
    return formIsValid;
  }
}
