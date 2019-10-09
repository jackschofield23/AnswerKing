import { DateTimeFormatValueConverter } from 'resources/value-converters/date-time-format';

describe('Date Time Value Converter', () => {
  let sut: DateTimeFormatValueConverter;

  beforeEach(() => {
    sut = new DateTimeFormatValueConverter();
  });

  it('returns an empty string if value is null', () => {
    const result = sut.toView(null);
    expect(result).toEqual('');
  });

  it('returns an empty string if value is undefined', () => {
    const result = sut.toView(undefined);
    expect(result).toEqual('');
  });

  it('returns an empty string if value is empty', () => {
    const result = sut.toView('');
    expect(result).toEqual('');
  });

  it('returns an empty string if value is invalid date', () => {
    const result = sut.toView('invalid-date');
    expect(result).toEqual('');
  });

  it('returns expected result with valid date', () => {
    const result = sut.toView(new Date(2019, 5, 19));
    expect(result).toEqual('19 Jun 2019');
  });

  it('returns expected result with valid date and format passed', () => {
    const result = sut.toView(new Date(2019, 5, 19), 'Do MMMM');
    expect(result).toEqual('19th June');
  });
});
