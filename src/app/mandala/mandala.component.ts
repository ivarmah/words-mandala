import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MandalaWord} from '../models/mandala-word';
import {GoogleSheetUtil} from '../utils/google-sheet.util';
import {HttpClient} from '@angular/common/http';
import {random} from 'lodash';
import * as uniqolor from 'uniqolor';

let CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500;

@Component({
  selector: 'app-mandala',
  templateUrl: './mandala.component.html',
  styleUrls: ['./mandala.component.scss']
})
export class MandalaComponent implements AfterViewInit {
  @ViewChild('mandalaWords') mandalaWords: ElementRef;

  words: MandalaWord[] = [];
  categories: string[] = ['Positive', 'Negative'];

  selectedCategory: string;

  started = false;

  score: string;

  countOfAllCategoryWords = 0;
  countOfCategoryWords = 0;

  private rawWordsData = [];

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    const sheetsUtil = new GoogleSheetUtil(this.http);
    CONTAINER_WIDTH = this.mandalaWords.nativeElement.offsetWidth;

    sheetsUtil.readData().subscribe(data => {
      console.log('data', data);
      this.categories = data.shift();
      this.rawWordsData = data;
    });
  }

  initRawWords(data, headers): MandalaWord[] {
    return data.reduce((acc: MandalaWord[], val: string[]) => {
      acc = [...acc, ...val.map((v, i) => {
        let [x, y] = this.getWordPosition();
        const wordWidth = this.getTextWidth(v);
        if ((x + wordWidth) > CONTAINER_WIDTH) {
          x = x + (CONTAINER_WIDTH - (x + wordWidth)) - 240;
        }
        return new MandalaWord(v, headers[i], x, y, 0, false, uniqolor(v + random(0, 100), {format: 'rgb'}).color);
      })];
      return acc;
    }, []);
  }

  getWordPosition(): [number, number] {
    return [random(0, CONTAINER_WIDTH), random(0, CONTAINER_HEIGHT - 40)];
  }

  start(): void {
    this.countOfCategoryWords = 0;
    this.started = true;
    this.words = [];
    this.words = this.initRawWords(this.rawWordsData, this.categories);
    this.countOfAllCategoryWords = this.words.filter(w => w.category === this.selectedCategory).length;
  }

  stop(): void {
    this.started = false;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  selectWord(word: MandalaWord): void {
    if (!word.selected && this.started && (word.category === this.selectedCategory)) {
      this.countOfCategoryWords += 1;
      word.selected = true;
    }

    if (this.countOfAllCategoryWords === this.countOfCategoryWords) {
      this.started = false;
    }
  }

  private getTextWidth(text, font?: string): number {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context.font = 'bold ' + getComputedStyle(document.body).font;

    return context.measureText(text).width;
  }
}
