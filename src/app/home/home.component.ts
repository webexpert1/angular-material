import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "../services/courses.service";
import {filter, map, shareReplay} from "rxjs/operators";

import { noop } from 'rxjs';
import { createHttpObservable } from '../services/utils';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {

      const http$ = createHttpObservable('http://localhost:9000/api/courses');

      const courses$: Observable<Course[]> = http$
        .pipe(
           map(res => Object.values(res["payload"])),
           shareReplay()
      );

      this.beginnerCourses$ = courses$
          .pipe(
            map(courses => courses.filter(course => course.category === 'BEGINNER'))
          );
      this.advancedCourses$ = courses$
          .pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED'))
          );

      // courses$.subscribe(
      //   courses => {
      //     console.log(courses);
      //     this.beginnerCourses$ = courses.filter(course => course.category === 'BEGINNER');
      //     this.advancedCourses$ = courses.filter(course => course.category === 'ADVANCED');
      //   }
      //   // noop,
      //   // () => console.log('completed')
      // )



        // const courses$ = this.coursesService.findAllCourses();

        // this.beginnerCourses$ = courses$.pipe(
        //   map(courses => courses.filter(course => course.category === 'BEGINNER') )
        // );

        // this.advancedCourses$ = courses$.pipe(
        //     map(courses => courses.filter(course => course.category === 'ADVANCED') )
        // );

    }

}
