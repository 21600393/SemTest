import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../shared/course';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // API URL
  apiUrl = 'http://localhost:5116/api/';

  // Configure the HTTP headers for JSON content
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  };

  // Inject the HttpClient into the constructor
  constructor(private httpClient: HttpClient) {}

  // Function to get all courses from the API
  GetCourses(): Observable<Course[]> {
    const endpoint = `${this.apiUrl}Course/GetAllCourses`;
    return this.httpClient.get<Course[]>(endpoint);
  }

  // Function to get a specific course by courseId from the API
  GetCourse(courseId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}Course/GetCourse/${courseId}`);
  }

  // Function to add a new course using the API
  AddCourse(course: Course) {
    const endpoint = `${this.apiUrl}Course/AddCourse`;
    return this.httpClient.post(endpoint, course);
  }

  // Function to delete a course by courseId using the API
  DeleteCourse(courseId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}Course/DeleteCourse/${courseId}`);
  }

  // Function to update a course by courseId using the API
  UpdateCourse(courseId: number, updatedCourse: Course) {
    return this.httpClient.put(`${this.apiUrl}Course/UpdateCourse/${courseId}`, updatedCourse);
  }
}
