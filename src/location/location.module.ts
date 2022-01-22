import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { LocationService } from './location.service'

import { LocationGateway } from './location.gateway'
import { LocationProcessor } from './location.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'location',
    }),
  ],
  providers: [LocationService, LocationGateway, LocationProcessor],
})
export class LocationModule {}
