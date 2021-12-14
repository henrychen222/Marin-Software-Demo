import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Note} from '../../models/note';
import {DataService} from '../../store/data.service';
import {UntilDestroy} from '@ngneat/until-destroy';
import {NoteConstant} from '../../constants/note.constant';
import {NoteService} from '../../services/note.service';
import {first} from 'rxjs/operators';
import {Table} from 'primeng/table';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, AfterViewInit {

  NotesData!: Note[];
  activeNote!: Note;
  displayModal = false;
  addOrEdit!: string;
  currentNoteText!: string;

  constructor(private readonly dataService: DataService, private readonly noteService: NoteService) {
  }

  ngOnInit() {
    this.loading();
  }

  ngAfterViewInit() {
    // console.log('data', this.NotesData);
  }

  sortAlphabeticalOrder() {
    this.NotesData.sort((x, y) => x.text.localeCompare(y.text));
  }

  loading() {
    const notes$ = this.noteService.getNotes();
    notes$.subscribe(notes => {
      this.NotesData = notes;
    });
  }

  addNewNote() {
    this.addOrEdit = 'Add';
    this.openModal();
  }

  save(newText: any) {
    if (this.addOrEdit.toLowerCase() === 'add') {
      const now = new Date(), year = now.getFullYear(), month = now.getMonth() + 1, date = now.getDate();
      const newNote = {
        id: this.NotesData.length + 1,
        text: newText,
        date: `${month}/${date}/${year}`,
        permission: 'yes'
      };
      // this.dataService.set(NoteConstant.ACTIVE_NOTE, {...newNote});
      this.addNoteToDB(newNote);
    } else if (this.addOrEdit.toLowerCase() === 'edit') {
      const idx = this.searchByText(this.currentNoteText);
      const note = this.NotesData[idx];
      const newNote = {...note, text: newText};
      this.updateNoteToDB(newNote, idx);
    }
    this.displayModal = false;
  }

  addNoteToDB(newNote: Note) {
    const add$ = this.noteService.addNote(newNote);
    add$.pipe(first()).subscribe(res => {
      alert(res.message);
      if (res.status === 'Accepted') {
        this.NotesData.push(newNote);
      }
    });
  }

  updateNoteToDB(newNote: Note, idx: number) {
    const update$ = this.noteService.updateNote(newNote);
    update$.subscribe(res => {
      alert(res.message);
      if (res.status === 'OK') {
        this.NotesData[idx] = newNote;
      }
    });
  }

  removeNoteToDB(id: number, idx: number) {
    const remove$ = this.noteService.removeNote(id);
    remove$.subscribe(res => {
      alert(res.message);
      if (res.status === 'OK') {
        this.NotesData.splice(idx, 1);
      }
    });
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
    this.removeNoteToDB(this.NotesData[idx].id, idx);
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

