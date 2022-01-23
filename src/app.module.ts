import { Module } from '@nestjs/common'

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
    InfluxModule.forRootAsync({
      useClass: InfluxConfigService,
    }),
  ],
})
export class AppModule {}
