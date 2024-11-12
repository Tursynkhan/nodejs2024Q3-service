// src/artist/artist.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  private artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    const updatedArtist = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };
    this.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  remove(id: string): void {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.artists.splice(artistIndex, 1);
    this.albumService.nullifyArtistId(id);
    this.trackService.nullifyArtistId(id);
  }
}
