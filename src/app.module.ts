import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { BullConfigService } from './common/config/bull/bull-config.service'
import { InfluxConfigService } from './common/config/influx/influx-config.service'

import { EnvModule } from './env/env.module'
import { InfluxModule } from './influx/influx.module'
import { LocationModule } from './location/location.module'
import { WsAdapterModule } from './ws-adapter/ws-adapter.module'

@Module({
  imports: [
    LocationModule,
    WsAdapterModule,
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
    InfluxModule.forRootAsync({
      useClass: InfluxConfigService,
    }),
    WsAdapterModule,
  ],
})
export class AppModule {}
