import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { NoteDao } from '../dao/note.dao';
import { Note } from '../model/note';
import { httpResponse } from '../model/http.response';
import { response } from 'express';

@Injectable()
export class NoteService {
  constructor(private readonly noteDao: NoteDao) {
  }

  async getAllNotesView() {
    return await this.noteDao.getAllNotes();
  }

  async addNote(note: Note) {
    let response: httpResponse;
    let message: string;
    if (!note.note_text || !note.note_date || !note.note_permission) {
      message = 'Please fill out Note Info!';
      response = {
        status: 'Failed',
        message: message,
        httpStatusCode: HttpStatus.BAD_REQUEST,
        body: null,
      };
      Logger.error(message);
      return response;
    }
    if (await this.isNoteExist(note.note_text)) {
      message = 'note exists! Please choose a new text';
      response = {
        status: 'Failed',
        message: message,
        httpStatusCode: HttpStatus.BAD_REQUEST,
        body: null,
      };
      Logger.error(message);
      return response;
    }
    message = 'add new note success';
    response = {
      status: 'Accepted',
      message: message,
      httpStatusCode: HttpStatus.ACCEPTED,
      body: null,
    };
    Logger.log(message);
    await this.noteDao.addNote(note);
    return response;
  }

  async getNoteByText(text: string): Promise<Note[]> {
    const res = await this.noteDao.getNoteByText(text);
    return res;
  }

  async isNoteExist(text: string): Promise<boolean> {
    const res = await this.getNoteByText(text);
    return res.length != 0;
  }

  async clearAllNotes() {
    await this.noteDao.clearAllNotes();
    const message = 'Success cleared all notes in database';
    const response = {
      status: 'Success',
      message: message,
      httpStatusCode: HttpStatus.OK,
      body: null,
    };
    return response;
  }
}
