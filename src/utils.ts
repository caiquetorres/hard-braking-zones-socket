import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { EnvService } from './env/env.service'

import { AppModule } from './app.module'
import { SentryFilter } from './common/filters/sentry/sentry.filter'

/**
 * Function that creates a `Nest` application.
 *
 * @returns an object that represents the application.
 */
export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)

  setupFilters(app, envService)

  return app
}
/**
 * Function that setup all the global application filters.
 *
 * @param app defines an object that represents the application instance.
 * @param envService defines an object that represents the application
 * environment service.
 */
function setupFilters(app: INestApplication, envService: EnvService): void {
  app.useGlobalFilters(new SentryFilter(envService))
}
