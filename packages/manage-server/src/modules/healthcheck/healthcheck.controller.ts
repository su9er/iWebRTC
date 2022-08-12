import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('健康检查')
@Controller('healthcheck')
export class HealthcheckController {
  @ApiOperation({ summary: '健康检查' })
  @Get()
  healthcheck() {
    return 'OK';
  }
}
