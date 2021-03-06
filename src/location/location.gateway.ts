import { UsePipes, ValidationPipe } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'

import { CreateLocationDto } from './dtos/create-location.dto'

import { LocationService } from './location.service'

/**
 * Gateway responsible for dealing with the velocity data receiving.
 */
@WebSocketGateway(8080)
export class LocationGateway {
  constructor(private readonly locationService: LocationService) {}

  /**
   * Method that creates a new velocity point in the influx database.
   *
   * @param dto defines an object that has the point data
   */
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @SubscribeMessage('location')
  async handleLocation(
    @MessageBody()
    dto: CreateLocationDto,
  ): Promise<void> {
    await this.locationService.saveOne(dto)
  }
}
