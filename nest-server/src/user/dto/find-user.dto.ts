import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber } from 'class-validator';

export class FindUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  id: number;
}
