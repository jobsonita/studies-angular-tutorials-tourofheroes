import { Pipe, PipeTransform } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';

@Pipe({
  name: 'withLoading'
})
export class WithLoadingPipe implements PipeTransform {

  transform<T>(observable?: Observable<T[]>) {
    return observable?.pipe(
      map((data) => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError(error => {
        console.error(error);
        return of({ loading: false, data: null, error });
      })
    );
  }

}
