import { ArgumentsHost, Catch, HttpException } from '@nestjs/common'
import { BaseWsExceptionFilter } from '@nestjs/websockets'
import * as Sentry from '@sentry/node'

import { EnvService } from '../../../env/env.service'

/**
 * Class that represents the filter that capture some exception and send
 * it to sentry.io.
 */
@Catch()
export class SentryFilter extends BaseWsExceptionFilter {
  /**
   * Property that defines if the sentry is enabled or not for this
   * application.
   */
  private readonly sentryEnabled: boolean

  constructor(envService: EnvService) {
    super()

    this.sentryEnabled =
      envService.get('SENTRY_ENABLED') && !!envService.get('SENTRY_DSN')

    if (this.sentryEnabled) {
      Sentry.init({
        environment: envService.get('NODE_ENV'),
        dsn: envService.get('SENTRY_DSN'),
        release: envService.get('PACKAGE_VERSION'),
      })
    }
  }

  /**
   * Method that deals with the thrown exceptions.
   *
   * @param exception defines and object that represents the thrown
   * exception.
   * @param host defines and object that represents the host arguments.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    if (this.sentryEnabled) {
      Sentry.captureException(exception)
    }

    super.catch(exception, host)
  }
}
