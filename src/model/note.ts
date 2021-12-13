import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'note_text', nullable: false })
  note_text: string;

  @Column({ type: 'varchar', name: 'note_date', nullable: false })
  note_date: string;

  @Column({ type: 'varchar', name: 'note_permission', nullable: false })
  note_permission: string;
}
