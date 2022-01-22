import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { WsAdapterService } from './ws-adapter.service'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'location',
    }),
  ],
  providers: [WsAdapterService],
})
export class WsAdapterModule {}
