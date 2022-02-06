import { WsAdapter } from '@nestjs/platform-ws'

import { EnvService } from './env/env.service'

import { createApp } from './utils'

async function bootstrap() {
  const app = await createApp()
  const envService = app.get(EnvService)
  app.useWebSocketAdapter(new WsAdapter())
  await app.listen(envService.get('PORT') || 3001)
}
bootstrap()
