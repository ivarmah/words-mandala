export class MandalaWord {
  constructor(
    public value: string,
    public category: string,
    public x: number,
    public y: number,
    public rotation: number,
    public selected: boolean = false,
    public color: string = 'black'
  ) {
  }
}
