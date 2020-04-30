import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private el:ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.addEventListener('click', () => {
      this.close();
    })
  }

  close(){
    this.el.nativeElement.classList.remove('sshow');
    this.el.nativeElement.classList.add('hhiden');
  }
}
