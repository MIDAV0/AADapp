import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';
import { ArticleRepository } from './article.repository';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
