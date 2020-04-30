import { Directive, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { SortDirection, SortEvent, rotate } from './pokemon.interface';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
  }
})
export class SortableHeaderDirective {
  constructor() { }
  @HostListener('click') rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

}
