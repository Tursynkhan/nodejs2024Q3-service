import { Module, forwardRef } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
