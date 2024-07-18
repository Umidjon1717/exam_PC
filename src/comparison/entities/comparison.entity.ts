import { Auth } from "../../auth/entities/auth.entity";
import { Entity, Column, CreateDateColumn,UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import {v4 as uuidv4} from 'uuid'

@Entity()
export class Comparison {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=> Auth, (auth)=> auth.comparison)
    users:Auth[]

    @Column()
    name:string

    @Column()
    products:string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}