import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { LocationService } from './location.service'

import { LocationGateway } from './location.gateway'
import { LocationProcessor } from './location.processor'

// REVIEW: Remove `LocationGateway` from `providers` in production mode.

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'location',
    }),
  ],
  providers: [LocationService, LocationGateway, LocationProcessor],
})
export class LocationModule {}
