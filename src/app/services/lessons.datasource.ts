import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { of } from 'rxjs';

import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Lesson } from '../model/lesson';

export class LessonsDataSource implements DataSource<Lesson> {
  private lessonSubject = new BehaviorSubject<Lesson[]>([]);

  constructor(private coursesService: CoursesService) {
  }

  loadLessons(courseId: number, filter: string, sortDirection: string,
                pageIndex: number, pageSize: number ) {
                  this.coursesService.findLessons(courseId, sortDirection, pageIndex, pageSize)
                    //  .pipe(
                    //    catchError(() => of([]))
                    //  )
                     .subscribe(lessons => this.lessonSubject.next(lessons))
                }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) : void {
    this.lessonSubject.complete();
  }

}
