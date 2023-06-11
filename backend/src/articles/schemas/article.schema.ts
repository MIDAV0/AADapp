import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  articleId: string;
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  body: string;
  @Prop()
  created: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
