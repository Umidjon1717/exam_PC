import { Entity, Column, CreateDateColumn,UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import {v4 as uuidv4} from 'uuid'
import { ProductCurrency } from "../enum/product.enum";
import { Category } from "../../category/entities/category.entity";
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    description:string

    @ManyToOne(()=>Category, (category)=>category.products)
    category:Category

    @Column('decimal', { precision: 10, scale: 2 })
    price:number

    @Column({
        default:ProductCurrency.eur,
        enum:ProductCurrency,
        type:'enum'
    })
    currency:ProductCurrency

    @Column('json')
    features:JSON

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
