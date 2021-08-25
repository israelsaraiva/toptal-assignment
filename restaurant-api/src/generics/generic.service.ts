import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export abstract class GenericService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    return this.repository.findOne({ where: { id } });
  }

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: T): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
