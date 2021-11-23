import {Component, OnInit} from '@angular/core';
import {Note} from '../../models/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  NotesData!: Note[];
  displayModal = false;

  constructor() {
  }

  ngOnInit(): void {
    this.loading();
  }

  loading() {
    this.NotesData = [
      {
        id: 1,
        text: 'This is your first text',
        date: new Date().toDateString(),
        permission: 'yes'
      },
      {
        id: 2,
        text: 'This is your second text',
        date: new Date().toDateString(),
        permission: 'yes'
      },
    ];
  }

  openModal() {
    this.displayModal = true;
  }

  cancel() {
    this.displayModal = false;
  }

  save(text: any) {
    this.NotesData.push({
      id: this.NotesData.length + 1,
      text: text,
      date: new Date().toDateString(),
      permission: 'yes'
    });
    this.displayModal = false;
  }

  delete(text: string) {
    let idx = -1;
    for (let i = 0; i < this.NotesData.length; i++) {
      if (this.NotesData[i].text == text) {
        idx = i;
        break;
      }
    }
    console.log('idx', idx);
    this.NotesData.splice(idx, 1);
  }

  edit() {

  }
}
