import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArticleRepository } from './article.repository';
import { Article } from './schemas/article.schema';
import { UpdateArticleDto } from './dtos/updateArticle.dto';
import mongoose from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}
  getArticles() {
    return this.articleRepository.find({});
  }

  getArticle(id: string): Promise<Article> {
    const articleObjectId = new mongoose.Types.ObjectId(id);
    return this.articleRepository.findById(articleObjectId);
  }

  createArticle(title: string, author: string, body: string): Promise<Article> {
    const now = new Date();
    return this.articleRepository.create({
      articleId: uuidv4(),
      title,
      author,
      body,
      created: now,
    });
  }

  updateArticcle(id: string, articleUpdates: UpdateArticleDto) {
    return this.articleRepository.findOneAndUpdate(id, articleUpdates);
  }
  deleteArticle(articleId: string) {
    return this.articleRepository.findOneAndDelete(articleId);
  }
}
