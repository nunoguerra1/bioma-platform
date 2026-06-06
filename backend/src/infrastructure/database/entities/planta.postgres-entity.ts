import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioPostgresEntity } from './usuario.postgres-entity';

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

    @ManyToOne(() => UsuarioPostgresEntity, (usuario) => usuario.plantas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioPostgresEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}