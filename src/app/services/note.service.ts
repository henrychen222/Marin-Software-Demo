import {Injectable} from '@angular/core';
import {Note} from '../models/note';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // url = './assets/notes.json';

  constructor(private readonly restService: RestService) {
  }

  getNotes() {
    return this.restService.get('notes');
  }

  addNote(note: Note) {
    const payload = {
      'text': note.text,
      'date': note.date,
      'permission': note.permission
    };
    return this.restService.post('add', payload);
  }

  updateNote(newNote: Note) {
    const payload = newNote;
    return this.restService.put('update', payload);
  }

  removeNote(id: number) {
    const payload = {id: id};
    return this.restService.delete(`remove?id=${id}`);
  }
}
