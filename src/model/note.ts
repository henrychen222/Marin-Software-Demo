import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'text', nullable: false })
  text: string;

  @Column({ type: 'varchar', name: 'date', nullable: false })
  date: string;

  @Column({ type: 'varchar', name: 'permission', nullable: false })
  permission: string;
}
