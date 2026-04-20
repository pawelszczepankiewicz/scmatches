import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MatchesModule } from './matches/matches.module';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
      exclude: ['/api/(.*)'],
      serveStaticOptions: {
        index: ['index.html'],
        fallthrough: false,
      },
    }),
    FirestoreModule,
    MatchesModule,
  ],
})
export class AppModule {}
