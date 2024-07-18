import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { CreateComparisonDto } from './dto/create-comparison.dto';
import { UpdateComparisonDto } from './dto/update-comparison.dto';

@Controller('comparison')
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @Post()
  create(@Body() createComparisonDto: CreateComparisonDto) {
    return this.comparisonService.create(createComparisonDto);
  }

  @Get()
  findAll() {
    return this.comparisonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comparisonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComparisonDto: UpdateComparisonDto) {
    return this.comparisonService.update(id, updateComparisonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comparisonService.remove(id);
  }
}
