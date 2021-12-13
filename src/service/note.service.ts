import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { NoteDao } from '../dao/note.dao';
import { Note } from '../model/note';
import { httpResponse } from '../model/http.response';

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
    if (!note.text || !note.date || !note.permission) {
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
    if (await this.isNoteExist(note.text)) {
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

  async updateNote(newNote: Note) {
    const ErrorMessage = 'Failed to Update',
      successMessage = 'Update successfully';
    const errorResponse = {
      status: 'Failed',
      message: ErrorMessage,
      httpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: null,
    };
    const successResponse = {
      status: 'OK',
      message: successMessage,
      httpStatusCode: HttpStatus.OK,
      body: null,
    };
    const id = newNote.id;
    let hasError = false;
    const curNoteArray = await this.noteDao.getNoteById(id);
    for (const curNote of curNoteArray) {
      const error = await this.noteDao.updateNote(curNote.id, newNote.text);
      if (error) {
        hasError = true;
      }
    }
    return hasError ? errorResponse : successResponse;
  }

  async removeNote(id: number) {
    const ErrorMessage = 'Failed to remove note',
      successMessage = 'remove note successfully';
    const errorResponse = {
      status: 'Failed',
      message: ErrorMessage,
      httpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: null,
    };
    const successResponse = {
      status: 'OK',
      message: successMessage,
      httpStatusCode: HttpStatus.OK,
      body: null,
    };
    let hasError = false;
    const NoteArrayToRemove = await this.noteDao.getNoteById(id);
    // console.log('NoteArrayToRemove', NoteArrayToRemove);
    for (const noteToRemove of NoteArrayToRemove) {
      const error = await this.noteDao.removeNoteById(noteToRemove.id);
      if (error) {
        hasError = true;
      }
    }
    return hasError ? errorResponse : successResponse;
  }

  getNoteByText(text: string): Promise<Note[]> {
    return this.noteDao.getNoteByText(text);
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
