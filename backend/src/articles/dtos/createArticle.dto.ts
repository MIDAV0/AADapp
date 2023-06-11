import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly author: string;
  @ApiProperty()
  readonly body: string;
}
