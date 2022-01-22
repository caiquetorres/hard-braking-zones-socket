import { INestApplicationContext } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { WsAdapterService } from './ws-adapter/ws-adapter.service'

import { AppModule } from './app.module'
import { APIGatewayEvent } from 'aws-lambda'

let app: INestApplicationContext

async function bootstrap(): Promise<INestApplicationContext> {
  return await NestFactory.createApplicationContext(AppModule)
}

/**
 * Function that is executed in `Lambda AWS`.
 *
 * @param event defines an object that represents the lambda event.
 * @param context defines an object that represents the labmda context.
 * @param callback defiens an object that represents the lambda
 * callback.
 */
export async function handler(event: APIGatewayEvent) {
  const {
    requestContext: { routeKey },
  } = event

  app ??= await bootstrap()

  const wsAdapter = app.get(WsAdapterService)

  switch (routeKey) {
    case '$connect':
      return wsAdapter.handleOnConnect()
    case '$disconnect':
      return wsAdapter.handleOnDisconnect()
    default:
      return wsAdapter.handleOnMessage(event.body)
  }
}
