import { Column, PrimaryGeneratedColumn, Entity,CreateDateColumn,UpdateDateColumn, Unique, OneToMany } from "typeorm";
import {v4 as uuidv4} from 'uuid'
import { UserRoles } from "../enums/user.role";
import { Comparison } from "../../comparison/entities/comparison.entity";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({
        type:'enum',
        enum:UserRoles,
        default:UserRoles.USER
    })
    role:UserRoles

    @OneToMany(() => Comparison, comparison => comparison.users)
    comparison: Comparison[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
