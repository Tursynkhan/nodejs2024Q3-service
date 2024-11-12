import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../track/track.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [TrackModule, FavoritesModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [TrackService],
})
export class AlbumModule {}
