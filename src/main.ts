import { ValidationFilter, ValidationException } from './validation.filter';
import { UserStoryModule } from './user-story/user-story.module';
import { UsStatusModule } from './us-status/us-status.module';
import { ProjectModule } from './project/project.module';
import {
  ClassSerializerInterceptor,
  RequestMethod,
  ValidationPipe,
  VersioningType,
  ValidationError,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { UserModule } from './user/user.module';
import { MemberModule } from './member/member.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg = {};
        errors.forEach((err) => {
          if (err.children.length !== 0) {
            err.children.forEach((err) => {
              err.children.forEach(
                (err) =>
                  (errMsg[err.property] = [...Object.values(err.constraints)]),
              );
            });
          } else {
            errMsg[err.property] = [...Object.values(err.constraints)];
          }
        });
        return new ValidationException(errMsg);
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new ValidationFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Kanban Board - Sistem Manajemen Aplikasi')
    .setDescription('Sistem Manajemen Aplikasi dengan metode Kanban')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      UserModule,
      ProjectModule,
      MemberModule,
      UsStatusModule,
      UserStoryModule,
    ],
  });
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Kanban Board',
  });

  app.enableCors();

  app.use(cookieParser());

  await app.listen(3500);
}
bootstrap();
