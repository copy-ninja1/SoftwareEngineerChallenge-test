import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import graphApi from '../utils';
import { AccountPageDto } from './dto/account-page.dto';
import { ConversationDto } from './dto/conversation.dto';

@Injectable()
export class PageService {
  create(createPageDto: CreatePageDto) {
    return 'This action adds a new page';
  }

  async findAll(body: AccountPageDto) {
    try {
      const { data } = await graphApi.get('/me/accounts', {
        params: { access_token: body.accessToken },
      });
      return data;
    } catch (err) {
      const { data } = err.response;

      if (data && data.error) {
        throw new InternalServerErrorException(data.error.message);
      }
      throw new InternalServerErrorException(
        'An Error Occured while trying to geting messages',
      );
    }
  }

  async findConversation(pageId: string, body: AccountPageDto) {
    try {
      const { data } = await graphApi.get(`/${pageId}/conversations`, {
        params: { access_token: body.accessToken, fields: 'participants' },
      });
      return data;
    } catch (err) {
      const { data } = err.response;

      if (data && data.error) {
        throw new InternalServerErrorException(data.error.message);
      }
      throw new InternalServerErrorException(
        'An Error Occured while trying to geting messages',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
