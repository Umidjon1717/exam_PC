import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()

export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    const newCategory= this.categoryRepository.create(createCategoryDto)
    return this.categoryRepository.save(newCategory)
  }

  async findAll():Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async findOne(id: string):Promise<Category> {
    return this.categoryRepository.findOne({where:{id}})
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto)
    return this.categoryRepository.findOne({where:{id}})
  }

  async remove(id: string) {
    return this.categoryRepository.delete(id)
  }
}
