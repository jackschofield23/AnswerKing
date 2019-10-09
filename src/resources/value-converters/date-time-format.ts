import moment from 'moment';

export class DateTimeFormatValueConverter {
  public toView(value: string | Date, format?: string): string {
    if (!value) {
      return '';
    }

    const date = moment(value);

    if (!date.isValid()) {
      return '';
    }

    if (!format) {
      format = 'DD MMM YYYY';
    }

    return date.format(format);
  }
}
