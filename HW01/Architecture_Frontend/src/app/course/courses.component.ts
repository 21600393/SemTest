import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Course } from '../shared/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  // Array to hold Course objects
  courses: Course[] = [];

  // Inject the DataService service into the constructor
  constructor(private dataService: DataService) {}

  // ngOnInit lifecycle hook
  ngOnInit(): void {
    // Retrieve courses and log the courses array
    this.getCourses();
    console.log(this.courses);
  }

  // Function to retrieve courses using the DataService
  getCourses() {
    this.dataService.GetCourses().subscribe((result) => {
      // Store the result in the courseList array
      let courseList: any[] = result;

      // Loop through the courseList array and add each course to the courses array
      courseList.forEach((element) => {
        this.courses.push(element);
      });
    });
  }

  // Function to delete a course by courseId
  deleteCourse(courseId: number): void {
    // Call the DataService's deleteCourse method with the courseId
    this.dataService.DeleteCourse(courseId).subscribe(() => {
      // Remove the deleted course from the courses array by filtering it out
      this.courses = this.courses.filter((course) => course.courseId !== courseId);
    });
  }

  // Function to handle mouse over event
  onMouseOver(event: MouseEvent): void {
    this.toggleHighlight(event, true);
  }

  // Function to handle mouse out event
  onMouseOut(event: MouseEvent): void {
    this.toggleHighlight(event, false);
  }

  // Function to add or remove a highlight on a table row based on the mouse event
  private toggleHighlight(event: MouseEvent, isHighlighted: boolean): void {
    // Get the closest table row to the event target
    const tr = (event.target as Element).closest('tr');

    // If a table row is found, add or remove the 'bg-primary' class based on isHighlighted
    if (tr) {
      isHighlighted ? tr.classList.add('bg-primary') : tr.classList.remove('bg-primary');
    }
  }
}
