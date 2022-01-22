import { Injectable, Logger } from '@nestjs/common'

import { CreateLocationDto } from './dtos/create-location.dto'

@Injectable()
export class LocationService {
  async createMany(dtos: CreateLocationDto[]) {
    Logger.debug(dtos)
    return undefined
  }
}
