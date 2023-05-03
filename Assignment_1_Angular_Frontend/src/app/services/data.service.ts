import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Course } from '../shared/course';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:5116/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }

  getCourse(courseId: number) {
    return this.httpClient.get(`${this.apiUrl}Course/GetCourse` + "/" + courseId)
    .pipe(map(result => result))
  }

  getCourses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Course/GetAllCourses`)
    .pipe(map(result => result))
  }

  addCourse(course: Course)
  {
    return this.httpClient.post(`${this.apiUrl}Course/AddCourse`, course, this.httpOptions)
  }

  deleteCourse(courseId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}Course/DeleteCourse` + "/" + courseId, this.httpOptions)
  }

  editCourse(courseId: number, course: Course)
  {
    return this.httpClient.put(`${this.apiUrl}Course/EditCourse/${courseId}`,course, this.httpOptions)
  }

}


