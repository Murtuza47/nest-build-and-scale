import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    const result = await createDocument.save();
    return result.toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn(
        '[FindOne] - Could not find document with filterQuery',
        filterQuery,
      );
      throw new NotFoundException('Document not found!');
    }

    return document as TDocument;
  }

  async findOneAndupdate(filterQuery: FilterQuery<TDocument>, updateQuery: UpdateQuery<TDocument>) {
    const document = await this.model.findOneAndUpdate(filterQuery, updateQuery, { lean: true, new: true });
    if (!document) {
      this.logger.warn(
        '[FindOneAndUpdate] - Could not find document with filterQuery',
        filterQuery,
      );
      throw new NotFoundException('Document not found!');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
