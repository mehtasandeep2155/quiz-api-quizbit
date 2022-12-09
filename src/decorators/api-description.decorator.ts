import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { RESPONSE_MESSAGE } from 'src/utilities/enums';

export function ApiDescription(description) {
  return applyDecorators(
    ApiBearerAuth(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ description }),
    ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS }),
    ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND }),
    ApiUnauthorizedResponse({
      description: RESPONSE_MESSAGE.UNAUTHORIZED_USER
    }),
    ApiInternalServerErrorResponse({
      description: RESPONSE_MESSAGE.SERVER_ERROR
    })
  );
}
