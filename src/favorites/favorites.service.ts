// src/favorites/favorites.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Favorites } from './favorites.entity';
import { validate as isUuid } from 'uuid';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  findAll() {
    return {
      artists: this.favorites.artists.map((id) =>
        this.artistService.findOne(id),
      ),
      albums: this.favorites.albums.map((id) => this.albumService.findOne(id)),
      tracks: this.favorites.tracks.map((id) => this.trackService.findOne(id)),
    };
  }

  addTrack(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      this.trackService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException(
        `Track with id ${id} does not exist`,
      );
    }
    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
  }

  removeTrack(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      this.albumService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException(
        `Album with id ${id} does not exist`,
      );
    }
    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
  }

  removeAlbum(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const index = this.favorites.albums.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.favorites.albums.splice(index, 1);
  }

  addArtist(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    try {
      this.artistService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException(
        `Artist with id ${id} does not exist`,
      );
    }
    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }

  removeArtist(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }
    this.favorites.artists.splice(index, 1);
  }

  // Methods to remove IDs when entities are deleted
  removeTrackId(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  removeAlbumId(id: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  removeArtistId(id: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
