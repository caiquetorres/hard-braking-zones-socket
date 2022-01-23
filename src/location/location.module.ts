import { Module } from '@nestjs/common'

import { LocationService } from './location.service'

import { LocationGateway } from './location.gateway'

// REVIEW: Remove `LocationGateway` from `providers` in production mode.

@Module({
  providers: [LocationService, LocationGateway],
  exports: [LocationService],
})
export class LocationModule {}
