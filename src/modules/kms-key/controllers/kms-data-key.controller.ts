import {
  Controller,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags
} from '@nestjs/swagger';
import { HEADER_KEY } from 'src/auth/constants/strategy.constant';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { AuthHeaderApiKeyGuard } from 'src/auth/guards/header-api-key-auth.guard';
import {
  BaseApiErrorResponse,
  BaseApiResponse,
  SwaggerBaseApiResponse
} from 'src/shared/dtos/base-api-response.dto';

import { KmsDataKeyService } from '../services/kms-key.service';

@Controller('kms')
@ApiTags('kms')
@ApiSecurity(HEADER_KEY.API_KEY)
@ApiSecurity('basic')
@UseGuards(AuthHeaderApiKeyGuard, BasicAuthGuard)
export class KmsDataKeyController {
  constructor(private readonly kmsDataKeyService: KmsDataKeyService) {}

  @Post('generate-data-key')
  @ApiOperation({
    summary: 'Generate data key',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(String),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  async generateDataKey(): Promise<BaseApiResponse<string>> {
    const dataKey = await this.kmsDataKeyService.generateOrGetDataKey();
    return {
      data: !!dataKey ? 'success' : 'fail',
      meta: {},
    };
  }
}
