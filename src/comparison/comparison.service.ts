import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComparisonDto } from './dto/create-comparison.dto';
import { UpdateComparisonDto } from './dto/update-comparison.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comparison } from './entities/comparison.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComparisonService {
  constructor(
    @InjectRepository(Comparison)
    private readonly CompasrisonRepository: Repository<Comparison>,
  ) {}

  async create(createComparisonDto: CreateComparisonDto): Promise<Comparison> {
    const newComparison = this.CompasrisonRepository.create(createComparisonDto);
    return this.CompasrisonRepository.save(newComparison);
  }

  async findAll(): Promise<Comparison[]> {
    return this.CompasrisonRepository.find();
  }

  async findOne(id: string): Promise<Comparison> {
    const product = await this.CompasrisonRepository.findOne({ where: { id }});
    if (!product) {
      throw new NotFoundException(`Comparison with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateCompariosnDto: UpdateComparisonDto): Promise<Comparison> {
    await this.CompasrisonRepository.update(id, updateCompariosnDto);
    const updatedCompasion = await this.CompasrisonRepository.findOne({ where: { id } });
    if (!updatedCompasion) {
      throw new NotFoundException(`Comparison with ID ${id} not found`);
    }
    return updatedCompasion;
  }

  async remove(id: string): Promise<void> {
    const result = await this.CompasrisonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comparison with ID ${id} not found`);
    }
  }
}
