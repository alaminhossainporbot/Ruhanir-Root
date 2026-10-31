export function toBanglaDigits(input: string | number): string {
  const banglaDigits: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };
  return String(input).replace(/[0-9]/g, (digit) => banglaDigits[digit] || digit);
}

export function formatNewsDate(dateStr: string, lang: 'bn' | 'en'): string {
  const [year, month, day] = dateStr.split('-');
  const monthIndex = parseInt(month, 10) - 1;

  const enMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const bnMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
  ];

  if (lang === 'bn') {
    return `${toBanglaDigits(parseInt(day, 10))} ${bnMonths[monthIndex]} ${toBanglaDigits(year)}`;
  }
  return `${parseInt(day, 10)} ${enMonths[monthIndex]} ${year}`;
}
