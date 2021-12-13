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
      const text = note?.text,
        date = note?.date,
        permission = note?.permission;
      const query = `INSERT INTO ${table} (text, date, permission)
      VALUES ('${text}', '${date}', '${permission}');`;
      Logger.log(query);
      await this.noteRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }

  async updateNote(id: number, text: string): Promise<boolean> {
    let error = false;
    try {
      const query = `UPDATE ${table} SET text = '${text}' WHERE id = ${id};`;
      Logger.log(query);
      await this.noteRepo.query(query);
    } catch (e) {
      error = true;
      Logger.error(e);
    }
    return error;
  }

  async getNoteByText(text: string) {
    try {
      const where = `WHERE N.text = '${text}'`;
      const query = `SELECT * FROM ${table} AS N ${where};`;
      Logger.log(query);
      return await this.noteRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }

  async getNoteById(id: number) {
    try {
      const where = `WHERE N.id = '${id}'`;
      const query = `SELECT * FROM ${table} AS N ${where};`;
      Logger.log(query);
      return await this.noteRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }

  async removeNoteById(id: number) {
    let error = false;
    try {
      const where = `WHERE ${table}.id = ${id}`;
      const query = `DELETE FROM ${table} ${where};`;
      Logger.log(query);
      await this.noteRepo.query(query);
    } catch (e) {
      error = true;
      Logger.error(e);
    }
    return error;
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
