import {Component, OnInit} from '@angular/core';
import {Note} from '../../models/note';
import {DataService} from '../../store/data.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NoteConstant} from '../../constants/note.constant';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  NotesData!: Note[];
  activeNote!: Note;
  displayModal = false;
  addOrEdit!: string;
  currentNoteText!: string;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.NotesData = [];
    this.loading();
  }

  loading() {
    // this.NotesData = [
    //   {
    //     id: 1,
    //     text: 'This is your first text',
    //     date: new Date().toDateString(),
    //     permission: 'yes'
    //   },
    //   {
    //     id: 2,
    //     text: 'This is your second text',
    //     date: new Date().toDateString(),
    //     permission: 'yes'
    //   },
    // ];

    // TODO: try to use a front end database, but seems not work. Think the better way is to create a backend with DB
    this.dataService
      .getListener(NoteConstant.ACTIVE_NOTE)
      .pipe(untilDestroyed(this))
      .subscribe((activeNote: any) => {
        // console.log('activeNote', activeNote);
      });
  }

  addNewNote() {
    this.addOrEdit = 'Add';
    this.openModal();
  }

  save(newText: any) {
    if (this.addOrEdit.toLowerCase() === 'add') {
      const newNote = {
        id: this.NotesData.length + 1,
        text: newText,
        date: new Date().toDateString(),
        permission: 'yes'
      };
      this.NotesData.push(newNote);
      // this.dataService.set(NoteConstant.ACTIVE_NOTE, {...newNote});
    } else if (this.addOrEdit.toLowerCase() === 'edit') {
      const idx = this.searchByText(this.currentNoteText);
      const note = this.NotesData[idx];
      this.NotesData[idx] = {...note, text: newText};
    }
    this.displayModal = false;
  }

  searchByText(text: string) {
    let idx = -1;
    for (let i = 0; i < this.NotesData.length; i++) {
      if (this.NotesData[i].text == text) {
        idx = i;
        break;
      }
    }
    return idx;
  }

  deleteNote(text: string) {
    let idx = this.searchByText(text);
    this.NotesData.splice(idx, 1);
  }

  editNote(text: string) {
    this.addOrEdit = 'Edit';
    this.currentNoteText = text;
    this.openModal();
  }

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }
}
