import { Module } from '@nestjs/common'

import { InfluxConfigService } from './common/config/influx/influx-config.service'

import { InfluxModule } from './influx/influx.module'

@Module({
  imports: [
    InfluxModule.forRootAsync({
      useClass: InfluxConfigService,
    }),
  ],
})
export class AppModule {}
