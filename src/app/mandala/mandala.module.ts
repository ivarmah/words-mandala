import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MandalaComponent} from './mandala.component';
import {WordComponent} from './word/word.component';
import {HttpClientModule} from '@angular/common/http';
import {GoogleSheetsDbService} from 'ng-google-sheets-db';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    MandalaComponent,
    WordComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbDropdownModule,
    DragDropModule
  ],
  providers: [GoogleSheetsDbService],
  exports: [MandalaComponent]
})
export class MandalaModule {
}
