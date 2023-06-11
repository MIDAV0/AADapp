import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly body: string;
}
