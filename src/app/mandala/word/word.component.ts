import {Component, Input, OnInit} from '@angular/core';
import {MandalaWord} from '../../models/mandala-word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  @Input() value: MandalaWord;
  @Input() selected: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }
}
