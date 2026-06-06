import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('plantas')
export class PlantaPostgresEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    titulo: string;

    @Column({ type: 'varchar', length: 50 })
    status: string;

    @Column({ type: 'int' })
    vitalidade: number;

    @Column({ type: 'text', nullable: true })
    imagem: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}