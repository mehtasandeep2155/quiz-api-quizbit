import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

export class BaseService<T> {
  constructor(private readonly model: Model<T>) {}

  /**
@param createDto
@returns return a promise after successfully saving
*/
  async create(createDto): Promise<T> {
    try {
      const record = new this.model(createDto);
      await record.save();
      return record;
    } catch (err) {
      throw new BadRequestException({
        error: {
          message: err.message
        }
      });
    }
  }

  /**
@param updateDto
@param id
@returns retun a promise after updation data on specified id
*/

  async update(id: string, updateDto) {
    const existingUser = await this.model.findByIdAndUpdate(id, updateDto, {
      new: true
    });

    await existingUser.save();
    if (!existingUser) {
      throw new NotFoundException(`${id} not found`);
    }
    return existingUser;
  }

  /**
@returns return all thee records of given model
*/

  async findAll() {
    return await this.model.find();
  }

  /**
@param id
@returns return record of specified id
*/
  async findOne(id: string) {
    return await this.model.findById(id);
  }

  /**
@param field
@returns return one record of specified query
*/
  async findByField(field: any) {
    return await this.model.findOne(field as any);
  }

  /**
@param id
@returns return deleted record
*/
  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  /**
   *
   * @param ids
   * @param keys
   * @returns updated objects based on ids
   */
  async updateMany(ids, keys) {
    return await this.model.updateMany(
      { _id: { $in: ids } },
      { $set: keys },
      { multi: true },
      function (err) {
        if (err) {
          return false;
        }
      }
    );
  }

  /**
   *
   * @param keys
   * @returns add multiple records
   */
  async insertMany(keys) {
    return await this.model.insertMany(keys);
  }
}
