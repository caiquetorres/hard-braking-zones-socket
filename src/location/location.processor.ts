import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'

import { CreateLocationDto } from './dtos/create-location.dto'

import { EnvService } from '../env/env.service'
import { LocationService } from './location.service'

import { Job } from 'bull'

/**
 * Processor that manages the `location` queue.
 */
@Processor('location')
export class LocationProcessor {
  /**
   * Property that defines the data amount that must be sent to the influx
   * database.
   */
  private readonly maxCount: number

  constructor(
    envService: EnvService,
    private readonly locationService: LocationService,
  ) {
    this.maxCount = envService.get('LOCATIONS_MAX_COUNT')
  }

  /**
   * Method that saves the last `maxCount` location objects.
   *
   * @param job defines an object that represents the current queue job.
   */
  @Process()
  async save(job: Job<CreateLocationDto>) {
    const completedCount = await job.queue.getCompletedCount()

    Logger.log({ ...job.data })

    if (!(completedCount % this.maxCount) && completedCount !== 0) {
      Logger.debug('Saving locations') // TODO: Remove this line after AWS/Heroku tests

      const locations = (await job.queue.getCompleted()).map((j) => j.data)

      await this.locationService.createMany(locations)
      await job.queue.clean(100, 'completed')
    }
  }
}
