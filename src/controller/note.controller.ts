import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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

  /*
    {
      "id": 1,
      "text": "test",
      "date": "12/13/2021",
      "permission": "yes"
    }
   */
  @Put('update')
  async updateNote(@Body() note: Note) {
    return await this.noteService.updateNote(note);
  }

  @Delete('remove')
  async removeNote(@Query() path_variable) {
    return await this.noteService.removeNote(path_variable.id);
  }

  @Delete('clear')
  async clearALLNotes() {
    return await this.noteService.clearAllNotes();
  }
}
