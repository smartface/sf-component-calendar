import DateService from './DateWrapper';
import { DateObject } from '../core/DateObject';
import MomentHijri, { isMoment } from 'moment-hijri';
import { instanceofDateObject } from './instanceofDateObject';

type MomentHijriInstance = ReturnType<typeof MomentHijri>

export default class HijriDateService extends DateService<MomentHijriInstance> {
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

  isWeekend(day: number) {
    const wd = this._date.iDate(day).day();

    return wd === 4 || wd === 5;
  }

  startDayOfMonth() {
    return this.clone().iDate(1).weekday() + 1;
  }

  monthsShort() {
    //@ts-ignore Using private values
    return this._date.localeData()._iMonthsShort;
  }

  monthShort() {
    return this._date.format('iMMM');
  }

  monthLong() {
    return this._date.format('iMMMM');
  }

  monthsLong() {
    //@ts-ignore Using private values
    return this._date.localeData()._iMonths;
  }

  weekdaysShort() {
    return this._moment.weekdaysShort();
  }

  weekdaysLong() {
    return this._moment.weekdays();
  }

  daysCount() {
    //@ts-ignore build tsc gets mad at this.
    return this._moment.iDaysInMonth(this._date.year(), this._date.month());
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
      day: this._date.iDate(),
      month: this._date.iMonth() + 1
    };
  }

  toNormalizedObject(): DateObject & { lang: string; calendar: string } {
    return {
      year: this._date.iYear(),
      day: this._date.iDate(),
      month: this._date.iMonth() + 1,
      calendar: 'hijri',
      lang: this._lang
    };
  }

  protected setDate(date: DateObject | MomentHijriInstance | undefined, format = 'DD-MM-YYYY') {
    if (isMoment(date)) {
      this._date = date.clone();
    } else {
      let dateStr: string;
      if (date === undefined) {
        this._date = MomentHijri();
      } else if (instanceofDateObject(date)) {
        date.day = date.day || 1;
        this._date = MomentHijri(`${date.day}-${date.month}-${date.year}`, format);
      } else {
        throw new Error('Invalid date object');
      }
    }
  }
}
