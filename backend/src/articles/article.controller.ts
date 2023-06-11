import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { Article } from './schemas/article.schema';
import { UpdateArticleDto } from './dtos/updateArticle.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('')
  getArticles() {
    return this.articleService.getArticles();
  }

  @Get(':id')
  getArticle(@Param('id') id: string): Promise<Article> {
    return this.articleService.getArticle(id);
  }

  @Post('')
  createArticle(@Body() body: CreateArticleDto): Promise<Article> {
    return this.articleService.createArticle(
      body.title,
      body.author,
      body.body,
    );
  }

  @Patch('/:id')
  updateArticle(
    @Param('id') id: string,
    @Body() articleUpdates: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateArticcle(id, articleUpdates);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(id);
  }
}
