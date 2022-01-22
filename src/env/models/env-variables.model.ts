import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

/**
 * Class that represents how environment variables should be set before
 * the application starts.
 */
export class EnvVariables {
  @IsDefined({ message: 'It is required to set the "NODE_ENV"' })
  @IsString({ message: 'It is required to set a valid string value' })
  @IsIn(['test', 'development', 'production'])
  NODE_ENV: 'test' | 'development' | 'production'

  @IsOptional()
  @IsString({ message: 'It is required to set a valid string value' })
  PACKAGE_VERSION?: string

  @IsOptional()
  @IsNumber({}, { message: 'It is required to set a number value' })
  PORT?: number

  //#region Influx

  @IsOptional()
  @IsString({ message: 'It is required to set a valid string value' })
  INFLUXDB_USER?: string

  @IsOptional()
  @IsString({ message: 'It is required to set a valid string value' })
  INFLUXDB_USER_PASSWORD?: string

  @IsDefined({ message: 'It is required to set the influx org' })
  @IsString({ message: 'It is required to set a valid string value' })
  INFLUXDB_ORG: string

  @IsDefined({ message: 'It is required to set the influx bucket' })
  @IsString({ message: 'It is required to set a valid string value' })
  INFLUXDB_BUCKET: string

  @IsDefined({ message: 'It is required to set the influx measurement name' })
  @IsString({ message: 'It is required to set a valid string value' })
  INFLUXDB_MEASUREMENT_NAME: string

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'It is required to set a valid number value' },
  )
  INFLUXDB_PORT?: number

  @IsOptional()
  @IsString({ message: 'It is required to set a valid string value' })
  INFLUXDB_HOST: string

  @IsDefined({ message: 'It is required to set the influx url' })
  @IsString({ message: 'It is required to set a valid string value' })
  INFLUXDB_URL: string

  @IsDefined({ message: 'It is required to set the influx token' })
  @IsString({ message: 'It is required to set a valid string value' })
  INFLUXDB_TOKEN: string

  @IsOptional()
  @IsString({ message: 'It is required to set a valid string value' })
  @IsIn(['http', 'https'])
  INFLUXDB_PROTOCOL?: 'http' | 'https'

  //#endregion

  //#region Redis

  @IsDefined({ message: 'It is required to set the "REDIS_HOST"' })
  @IsString({ message: 'It is required to set a valid string value' })
  REDIS_HOST: string

  @IsDefined({ message: 'It is required to set the "REDIS_PORT"' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'It is required to set a valid number value' },
  )
  REDIS_PORT?: number

  @IsDefined({ message: 'It is required to set the "REDIS_PASSWORD"' })
  @IsString({ message: 'It is required to set a valid string value' })
  REDIS_PASSWORD?: string

  //#endregion

  //#region Sentry

  @IsOptional()
  @IsBoolean({ message: 'It is required to set a valid boolean value' })
  SENTRY_ENABLED?: boolean

  @IsOptional()
  @IsString({ message: 'It is required to set a valid string' })
  SENTRY_DSN?: string

  //#endregion

  //#region Locations

  @IsDefined({ message: 'It is required to set the "LOCATIONS_MAX_COUNT"' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'It is required to set a valid number value' },
  )
  LOCATIONS_MAX_COUNT: number

  //#endregion
}
