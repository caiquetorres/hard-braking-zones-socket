import { Injectable, Type } from '@nestjs/common'
import { WsException, WsResponse } from '@nestjs/websockets'

import { CreateLocationDto } from '../location/dtos/create-location.dto'

import { LocationService } from '../location/location.service'

import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'

/**
 * Service that is responsible for validating data.
 */
@Injectable()
export class WsAdapterService {
  constructor(private readonly locationService: LocationService) {}

  handleOnConnect() {
    return {}
  }

  handleOnDisconnect() {
    return {}
  }

  /**
   * Method that validates and addes the location
   * object.
   *
   * @param message defines an object that represents
   * the `location` object.
   */
  async handleOnMessage(message: string) {
    try {
      const response = JSON.parse(message) as WsResponse<CreateLocationDto>
      const validatedData = this.validate(response.data, CreateLocationDto)
      await this.locationService.saveOne(validatedData)
    } catch (err) {
      throw new WsException(err)
    }
  }

  /**
   * Method that validates the data passed in the `data` parameter
   * using the `cls` object.
   *
   * @param data defines the object that will be validated.
   * @param cls defines a type that represents the type that will
   * be used to validate the `data` object.
   * @returns the validated object.
   */
  private validate<T extends object>(data: unknown, cls: Type<T>) {
    const validatedConfig = plainToClass(cls, data, {
      enableImplicitConversion: true,
    })
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    })

    if (errors.length > 0) {
      throw new WsException(errors.toString())
    }

    return validatedConfig
  }
}
