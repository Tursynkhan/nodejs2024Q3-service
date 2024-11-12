// src/album/album.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Album } from './album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];
  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    const updatedAlbum = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };
    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  remove(id: string): void {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.albums.splice(albumIndex, 1);
    this.trackService.nullifyAlbumId(id);
    this.favoritesService.removeAlbumId(id);
  }
  nullifyArtistId(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
