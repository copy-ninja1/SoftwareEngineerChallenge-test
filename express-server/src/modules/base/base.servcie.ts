import { autoInjectable } from "tsyringe";
import mongoose, { FilterQuery, QueryOptions } from "mongoose";
import ModelI from "../../interfaces/model.interface";

export default class BaseService<T> {
  model: mongoose.Model<any, any>;
  constructor(model: ModelI) {
    this.model = model.model;
  }

  post = async (data: T) => {
    try {
      const resourse = await this.model.create(data);
      return resourse;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  async get<I>(filters: FilterQuery<T> = {}, options?: QueryOptions): Promise<I[]> {
    const resource = (await this.model.find(filters, {}, options)) as I[];
    return resource;
  }

  async getOne<I>(filters: FilterQuery<I>, options?: QueryOptions): Promise<I> {
    const resource = (await this.model.findOne(filters, options)) as I;
    return resource;
  }

  async getById<I>(id: string, options?: QueryOptions): Promise<I> {
    try {
      const resource = (await this.model.findOne({ _id: new mongoose.Types.ObjectId(id) }, {}, options)) as I;
      return resource;
    } catch (err: any) {
      console.log({ err });
      throw new Error(err);
    }
  }

  updateOne = async (query = {}, update = {}, options: QueryOptions): Promise<T[]> => {
    const resource = (await this.model.updateOne(query, update, options)) as T[];
    return resource;
  };

  delete = (id: string): void => {
    return this.model.deleteOne({ _id: id });
  };
}
