import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpException,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination?: string;
  filename?: string;
}

let captchaText: string;

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('captcha')
  getCaptcha(@Res() res: Response) {
    const captcha = this.commentsService.generateCaptcha();

    captchaText = captcha.text;

    res.type('svg').send(captcha.data);
  }

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @UploadedFile() file: MulterFile,
  ) {
    const captcha = createCommentDto.captcha;

    if (captcha !== captchaText) {
      throw new HttpException(
        `Invalid captcha. Should be equal ${captchaText}, but input ${captcha}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file) {
      createCommentDto.attachmentUrl = `${process.env.HOSTNAME}/uploads/${file.filename}`;
    }

    return this.commentsService.create(createCommentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
