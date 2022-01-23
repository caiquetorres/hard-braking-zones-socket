import { Module } from '@nestjs/common'

import { WsAdapterService } from './ws-adapter.service'

import { LocationModule } from '../location/location.module'

@Module({
  imports: [LocationModule],
  providers: [WsAdapterService],
})
export class WsAdapterModule {}
