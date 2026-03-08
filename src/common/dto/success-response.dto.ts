import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: any;
}
