import { InjectQueue } from '@nestjs/bull'
import { Injectable, Type } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'

import { CreateLocationDto } from '../location/dtos/create-location.dto'

import { Queue } from 'bull'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'

/**
 * Service that is responsible for validating data.
 */
@Injectable()
export class WsAdapterService {
  constructor(
    @InjectQueue('location')
    private readonly queue: Queue,
  ) {}

  handleOnConnect() {
    return void 0
  }

  handleOnDisconnect() {
    return void 0
  }

  /**
   * Method that validates and addes the location
   * object.
   *
   * @param message defines an object that represents
   * the `location` object.
   */
  async handleOnMessage(message: string) {
    const data = JSON.parse(message)
    const validatedData = this.validate(data, CreateLocationDto)
    await this.queue.add(validatedData)
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
  private async validate<T extends object>(data: unknown, cls: Type<T>) {
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
