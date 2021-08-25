import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class AppService {
  result = moment();

  async test() {
    return this.result.weeksInYear();
  }
}
