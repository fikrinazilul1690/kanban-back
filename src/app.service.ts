import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  redirect(res: Response) {
    res.redirect('/api');
  }
}
