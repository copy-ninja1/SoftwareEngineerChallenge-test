import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import graphApi from '../utils';
import { AccountPageDto } from 'src/page/dto/account-page.dto';

@Injectable()
export class MessageService {
  async create(body: CreateMessageDto) {
    try {
      const { data } = await graphApi.post(`/${body.pageId}/messages`, {
        access_token: body.accessToken,
        messaging_type: 'RESPONSE',
        message: `{ 'text': '${body.text}' }`,
        recipient: `{ 'id': '${body.recipientId}' }`,
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
  async getMessage(conversationId: string, body: AccountPageDto) {
    try {
      const { data } = await graphApi.get(`/${conversationId}/messages`, {
        params: {
          access_token: body.accessToken,
          fields: 'from,message,tags,created_time',
        },
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
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} messag`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} messag`;
  }

  remove(id: number) {
    return `This action removes a #${id} messag`;
  }
}
