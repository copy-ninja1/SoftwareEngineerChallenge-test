import { PartialType } from '@nestjs/swagger';
import { AccountPageDto } from './account-page.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConversationDto extends PartialType(AccountPageDto) {
  @IsNotEmpty()
  @IsString()
  pageId: string;
}
