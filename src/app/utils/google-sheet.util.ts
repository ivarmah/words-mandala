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

  readData(spreadsheetId: string, apiKey: string): Observable<Array<string[]>> {
    return this.http
      .get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:B1000?key=${apiKey}`)
      .pipe(map((v: any) => v.values));
  }
}
