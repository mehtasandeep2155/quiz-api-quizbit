import { PartialType } from '@nestjs/swagger';
import { CreateUserPerformanceDto } from './create-user-performance.dto';

export class UpdateUserPerformanceDto extends PartialType(
  CreateUserPerformanceDto
) {}
