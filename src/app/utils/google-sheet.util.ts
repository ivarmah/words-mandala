import {GoogleSheetsDbService} from 'ng-google-sheets-db';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';

export class GoogleSheetUtil {
  attributesMapping = {
    positive: 'Positive',
    negative: 'Negative',
  };

  constructor(private http: HttpClient) {
  }

  readData(): Observable<Array<string[]>> {
    return this.http.get<Array<string[]>>(`https://impulseprime.eu/`);
  }
}
