import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum BadgePosition {
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_CENTER = 'BOTTOM_CENTER',
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
}

export enum BadgeSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export class GenerateBadgeDto {
  @ApiProperty({ 
    description: 'Position of the badge on the website',
    enum: BadgePosition,
    default: BadgePosition.BOTTOM_RIGHT,
    required: false
  })
  @IsOptional()
  @IsEnum(BadgePosition)
  position?: BadgePosition = BadgePosition.BOTTOM_RIGHT;

  @ApiProperty({ 
    description: 'Size of the badge widget',
    enum: BadgeSize,
    default: BadgeSize.MEDIUM,
    required: false
  })
  @IsOptional()
  @IsEnum(BadgeSize)
  size?: BadgeSize = BadgeSize.MEDIUM;

  @ApiProperty({ 
    description: 'Custom text to display on the badge',
    required: false
  })
  @IsOptional()
  @IsString()
  customText?: string;

  @ApiProperty({ 
    description: 'Whether to show company logo on the badge',
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  showLogo?: boolean = true;

  @ApiProperty({ 
    description: 'Whether to show appreciation status',
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  showAppreciationStatus?: boolean = true;
}