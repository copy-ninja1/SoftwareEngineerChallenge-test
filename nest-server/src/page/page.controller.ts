import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { AccountPageDto } from './dto/account-page.dto';

@Controller('page')
@ApiTags('page')
export class PageController {
  constructor(private readonly pagesService: PageService) {}

  @Post()
  create(@Body() payload: CreatePageDto) {
    return this.pagesService.create(payload);
  }

  @Get()
  async findAll(@Body() accessToken: AccountPageDto) {
    return await this.pagesService.findAll(accessToken);
  }
  @Get('/:pageId/conversations')
  async findConversation(
    @Param('pageId') pageId: string,
    @Body() payload: AccountPageDto,
  ) {
    return await this.pagesService.findConversation(pageId, payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayload: UpdatePageDto) {
    return this.pagesService.update(+id, updatePayload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(+id);
  }
}
