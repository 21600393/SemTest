import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './course/add-course.component';
import { CoursesComponent } from './course/courses.component';
import { EditCourseComponent } from './course/edit-course.component';

const routes: Routes = [
  {path: 'courses/add', component:AddCourseComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'course/:id', component: EditCourseComponent}, 
  {path: '', redirectTo: '/courses', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
