import {
  Catch,
  NotFoundException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { join } from 'path';
import { Response, Request } from 'express';

@Catch(NotFoundException)
export class SpaFallbackFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // API routes and file requests get the normal 404 JSON
    if (req.path.startsWith('/api/') || req.path.includes('.')) {
      res.status(404).json({
        statusCode: 404,
        message: exception.message,
      });
      return;
    }

    // SPA routes — serve index.html and let Vue Router handle it
    res.sendFile(
      join(__dirname, '..', '..', '..', 'frontend', 'dist', 'index.html'),
    );
  }
}
