import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../model/note';

const schema = 'marin'; // change to your database Name/Schema
const noteTable = 'note';
const table = `${schema}.${noteTable}`;

@Injectable()
export class NoteDao {
  constructor(@InjectRepository(Note) private noteRepo: Repository<Note>) {
  }

  async getAllNotes(): Promise<Note[]> {
    try {
      const query = `SELECT * FROM ${table};`;
      Logger.log(query);
      const notes = await this.noteRepo.query(query);
      return notes;
    } catch (e) {
      Logger.error(e);
    }
  }

  async addNote(note: Note) {
    try {
      const text = note?.note_text,
        date = note?.note_date,
        permission = note?.note_permission;
      const query = `INSERT INTO ${table} (note_text, note_date, note_permission)
      VALUES ('${text}', '${date}', '${permission}');`;
      Logger.log(query);
      await this.noteRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }

  async getNoteByText(text: string) {
    try {
      const where = `WHERE N.note_text = '${text}'`;
      const query = `SELECT * FROM ${table} AS N ${where};`;
      Logger.log(query);
      return await this.noteRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }

  async clearAllNotes() {
    try {
      const query = `TRUNCATE TABLE ${table};`;
      Logger.log(query);
      await this.noteRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }
}
