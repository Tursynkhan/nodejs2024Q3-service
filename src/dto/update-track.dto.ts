// src/track/dto/update-track.dto.ts
import { IsString, IsOptional, IsUUID, IsInt, Min } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @IsInt()
  @Min(0)
  @IsOptional()
  duration?: number;
}
