import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { PlantaPostgresEntity } from './planta.postgres-entity';

@Entity('usuarios')
export class UsuarioPostgresEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ name: 'senha_hash' })
    senhaHash: string;

    @OneToMany(() => PlantaPostgresEntity, (planta) => planta.usuario)
    plantas: PlantaPostgresEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}