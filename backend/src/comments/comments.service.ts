import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import * as svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'db/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);

    return await this.commentRepository.save(comment);
  }

  async findAll(page: number) {
    const limit = 25;
    const [comments, total] = await this.commentRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
    });

    return {
      items: comments,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOneBy({
      id: id,
    });

    if (!comment) {
      throw new NotFoundException(`Bank with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    await this.commentRepository.update(id, updateCommentDto);

    return await this.commentRepository.findOneBy({ id: id });
  }

  async remove(id: number) {
    const result = await this.commentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  generateCaptcha() {
    return svgCaptcha.create();
  }
}
