import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpException,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Request, Response } from 'express';
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

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
    @UploadedFile() file: MulterFile,
  ) {
    const captcha = req.body.captcha;
    const captchaText = req.session.captchaText;

    if (captcha !== captchaText) {
      throw new HttpException('Invalid captcha', HttpStatus.BAD_REQUEST);
    }

    if (file) {
      createCommentDto.attachmentUrl = `${process.env.HOSTNAME}/uploads/${file.filename}`;
    }

    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('captcha')
  getCaptcha(@Req() req: Request, @Res() res: Response) {
    const captcha = this.commentsService.generateCaptcha();

    req.session.captchaText = captcha.text;
    res.type('svg').send(captcha.data);
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
