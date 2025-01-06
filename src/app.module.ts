import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarRecordsModule } from './car-records/car-records.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRecord } from './car-records/car-records.entity';
import { CarImportModule } from './car-import/car-import.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [CarRecordsModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Pramu123',
      database: 'postgres',
      entities: [CarRecord],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis:{
        host:'localhost',
        port:6379
      }
    }),
    CarImportModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
