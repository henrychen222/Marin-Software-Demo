import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { NoteService } from '../service/note.service';
import { Note } from '../model/note';

@Controller('api/')
export class NoteController {
  constructor(private readonly noteService: NoteService) {
  }

  @Get('notes')
  async getAllNotesView() {
    return await this.noteService.getAllNotesView();
  }

  /*
    {
      "note_text": "this is a note",
      "note_date": "12/13/2021",
      "note_permission": "yes"
    }
   */
  @Post('add')
  async addNote(@Body() note: Note) {
    return await this.noteService.addNote(note);
  }

  @Delete('clear')
  async clearALLNotes() {
    return await this.noteService.clearAllNotes();
  }
}
