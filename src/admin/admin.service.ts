import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/utilities/base.service';
import { createAdmin } from 'src/utilities/constant';
import { hashPassword } from 'src/utilities/functions';
import { Admin, AdminDocument } from './entities/admin.entity';

@Injectable()
export class AdminService
  extends BaseService<AdminDocument>
  implements OnModuleInit {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>
  ) {
    super(adminModel);
  }
  async onModuleInit() {
    try {
      const adminCount = await this.adminModel.estimatedDocumentCount();
      if (!adminCount) {
        Object.assign(createAdmin,{
          password:hashPassword(createAdmin.password)
        })
        await this.adminModel.create(createAdmin);
      }
    } catch (error) {
      throw new Error('Can Not Create first admin');
    }
  }

  async findAdminByEmail(email: string): Promise<Admin> {
    return await this.adminModel.findOne({ email });
  }
}
