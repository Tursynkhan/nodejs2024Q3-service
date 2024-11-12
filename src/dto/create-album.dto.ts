// src/album/dto/create-album.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
