import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

require('dayjs/locale/es');

Dayjs.locale('es');
Dayjs.extend(utc)
Dayjs.extend(timezone)
Dayjs.tz.setDefault('America/El_salvador')

export const dayjs = Dayjs;
