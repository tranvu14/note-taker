import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class SearchNotesDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  isPinned?: string;

  @IsOptional()
  @IsString()
  onlyArchived?: string;

  @IsOptional()
  @IsString()
  tagId?: string;
} 