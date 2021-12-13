import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './model/note';
import { NoteController } from './controller/note.controller';
import { NoteService } from './service/note.service';
import { NoteDao } from './dao/note.dao';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'marin',
      entities: [Note],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Note]),
  ],
  controllers: [NoteController],
  providers: [NoteService, NoteDao],
})
export class AppModule {
}
