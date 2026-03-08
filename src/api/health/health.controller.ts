import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Status')
@Controller('status')
export class HealthController {
  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get API status of the server' })
  @ApiResponse({ type: SuccessResponseDto, status: HttpStatus.OK })
  statusCheck(): SuccessResponseDto {
    return {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Service is up and running',
      data: {
        status: 'ok',
        service: 'bff',
        timestamp: new Date().toISOString(),
      },
    };
  }
}
