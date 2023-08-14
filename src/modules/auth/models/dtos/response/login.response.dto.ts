import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJlbWFpbCI6Imxvb2pzQHVrci5uZXQiLCJpZCI6NTAsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoiQWRtaW5pc3RyYW5vciJ9XSwiaWF0IjoxNjkyMDEzOTIzLCJleHAiOjE2OTIxMDAzMjN9.Qo-HpSLYiZamqncpHgAGTOc5ohRs5fb-VGQwozjA4g0',
    description: 'The JWT token',
  })
  token: string;
}
