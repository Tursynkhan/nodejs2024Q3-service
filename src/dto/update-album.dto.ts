import { IsString, IsOptional, IsUUID, IsInt } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsUUID()
  @IsOptional()
  artistId?: string | null;
}
