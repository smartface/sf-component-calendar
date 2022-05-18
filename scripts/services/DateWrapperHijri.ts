import DateService from './DateWrapper';
import { Moment } from 'moment';
import { DateObject } from '../core/DateObject';

function notValidDateThrowanError(moment, date) {
  if (moment(date).isValid()) {
    throw new Error('Specified date is not valid.');
  }
}

export interface MomentHijri extends Moment {
  iDate(day?: number): {
    weekday: () => number;
    day: () => number;
    month: () => number;
    year: () => number;
  };
  iMonth(): number;
  iYear(): number;
  add(amount: any, type: any): MomentHijri;
  subtract(amount: any, type: any): MomentHijri;
  iDaysInMonth(): number;
  localeData: (() => {
    _iMonthsShort: string[];
    _iMonths: string[];
  }) &
    Moment['localeData'];
}

export default class HijriDateService extends DateService<MomentHijri> {
  month() {
    return this._date.format('iM');
  }

  year() {
    return this._date.format('iYYYY');
  }

  day() {
    return this._date.format('iD');
  }

  localeDate() {
    var now = this._date.clone();
    const localeDate = {
      day: now.format('iD'),
      month: now.format('iM'),
      year: now.format('iYYYY')
    };

    return {
      setDay(day: number) {
        localeDate.day = now.month(0).date(day).format('D');
        return this;
      },
      setMonth(month: number) {
        localeDate.month = now.month(month).format('iM');
        return this;
      },
      setYear(year: number) {
        localeDate.month = now.year(year).format('iYYYY');
        return this;
      },
      getDate() {
        return { ...localeDate };
      }
    };
    // return this._date.format("D-M-YYYY").toObject();
  }

  isWeekend(day) {
    const wd = this._date.iDate(day).day();

    return wd === 4 || wd === 5;
  }

  startDayOfMonth() {
    return this.clone().iDate(1).weekday() + 1;
  }

  monthsShort() {
    return this._date.localeData()._iMonthsShort;
  }

  monthShort() {
    return this._date.format('iMMM');
  }

  monthLong() {
    return this._date.format('iMMMM');
  }

  monthsLong() {
    return this._date.localeData()._iMonths;
  }

  weekdaysShort() {
    return this._moment.weekdaysShort();
  }

  weekdaysLong() {
    return this._moment.weekdays();
  }

  daysCount() {
    return (this._date.locale('en') as MomentHijri).iDaysInMonth();
  }

  nextMonth() {
    return new HijriDateService(this._moment, this.clone().add(1, 'iMonth'));
  }

  prevMonth() {
    return new HijriDateService(this._moment, this.clone().subtract(1, 'iMonth'));
  }

  prevYear() {
    return new HijriDateService(this._moment, this.clone().subtract(1, 'iYear'));
  }

  nextYear() {
    return new HijriDateService(this._moment, this.clone().add(1, 'iYear'));
  }

  toObject() {
    return {
      year: this._date.iYear(),
      day: this._date.iDate().day(),
      month: this._date.iMonth() + 1
    };
  }

  toNormalizedObject(): DateObject & { lang: string; calendar: string } {
    return {
      year: this._date.iYear(),
      day: this._date.iDate().day(),
      month: this._date.iMonth() + 1,
      calendar: 'hijri',
      lang: this._lang
    };
  }
}
