import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';

import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async findById(id: mongoose.Types.ObjectId): Promise<Article> {
    return this.articleModel.findById(id);
  }

  async find(articleFilterQuery: FilterQuery<Article>): Promise<Article[]> {
    return this.articleModel.find(articleFilterQuery);
  }

  async create(article: Article): Promise<Article> {
    const newArticle = new this.articleModel(article);
    return newArticle.save();
  }

  async findOneAndUpdate(
    articleId: string,
    article: Partial<Article>,
  ): Promise<Article> {
    const articleObjectId = new mongoose.Types.ObjectId(articleId);
    return this.articleModel.findOneAndUpdate(articleObjectId, article);
  }

  async findOneAndDelete(articleId: string): Promise<Article> {
    const articleObjectId = new mongoose.Types.ObjectId(articleId);
    return this.articleModel.findByIdAndDelete(articleObjectId);
  }
}
