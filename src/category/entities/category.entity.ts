import { Product } from "../../product/entities/product.entity";
import { Entity, Column, CreateDateColumn,UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {v4 as uuidv4} from 'uuid'
@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    description:string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(()=> Product, (product)=> product.category)
    products:Product[]
}
