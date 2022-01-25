import { Injectable, Logger } from '@nestjs/common'

import { CreateLocationDto } from './dtos/create-location.dto'

import { EnvService } from '../env/env.service'
import { InfluxService } from '../influx/influx.service'

/**
 * Service that deals with the `location` data management.
 */
@Injectable()
export class LocationService {
  /**
   * Property that defines an array that contains all the last `maxCount`
   * `location` data.
   */
  private locations: CreateLocationDto[] = []

  /**
   * Property that defines a value that indicates the max `location`
   * object amount that will be saved into the `locations` array before
   * sending it to the influx.
   */
  private readonly maxCount: number

  /**
   * Property that defines an object that represents the main service
   * logger.
   */
  private readonly logger = new Logger('LocationService')

  constructor(
    envService: EnvService,
    private readonly influxService: InfluxService,
  ) {
    this.maxCount = envService.get('LOCATIONS_MAX_COUNT')
  }

  /**
   * Method that saves each `location` data in a array, until the amount
   * of  saved data reaches the limit.
   *
   * @param dto defines an object that represents the `location`.
   */
  async saveOne(dto: CreateLocationDto) {
    this.locations.push(dto)

    if (!(this.locations.length % this.maxCount)) {
      this.logger.debug('Saving locations') // TODO: Remove this line after AWS/Heroku tests

      const l = [...this.locations]
      this.locations = []

      this.createMany(l)
    }
  }

  /**
   * Method that creates new location points in the influx database.
   *
   * @param dtos defines an array that contains objects and each one of
   * them represents the the point data
   */
  createMany(dtos: CreateLocationDto[]) {
    return this.influxService.createMany(dtos)
  }
}
