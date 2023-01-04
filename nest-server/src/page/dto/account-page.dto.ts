import { IsNotEmpty, IsString } from 'class-validator';

export class AccountPageDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
