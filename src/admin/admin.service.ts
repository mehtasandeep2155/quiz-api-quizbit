import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/utilities/base.service';
import { Admin, AdminDocument } from './entities/admin.entity';

@Injectable()
export class AdminService extends BaseService<AdminDocument> {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>
  ) {
    super(adminModel);
  }
  async findAdminByEmail(email: string): Promise<Admin> {
    return await this.adminModel.findOne({ email: email }).exec();
  }
}
