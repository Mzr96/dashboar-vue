export default class Mapper {
  static #mappingList = {
    branchName: 'شعبه',
    startingCredit: 'اعتبار اولیه بورس سهام',
    comexCredit: 'اعتبار اولیه بورس کالا',
    sfCredit: 'اعتبار اولیه بورس کالای آتی',
    totalAssetValue: 'ارزش روز دارایی',
    usableCredit: 'قدرت خرید',
    remain: 'مانده حساب',
    creditAssetValue: 'ارزش دارایی اعتباری',
    marginAccountValue: 'ارزش حساب تضمین',
    interest: 'کارمزد خلق شده',
    lastTransactionDate: 'تاریخ آخرین درخواست',
    nationalCode: 'کد ملی',
    fullName: 'نام',
    isCompany: 'حقیقی / حقوقی',
    isPortfo: 'وضعیت سبد گردانی مشتری',
  }

  static #numericTypeValue = [
    'اعتبار اولیه بورس کالای آتی',
    'اعتبار اولیه بورس سهام',
    'ارزش حساب تضمین',
    'اعتبار اولیه بورس کالا',
    'ارزش دارایی اعتباری',
    'کارمزد خلق شده',
    'ارزش روز دارایی',
    'مانده حساب',
    'قدرت خرید',
  ]

  static #stringTypeValue = [
    'نام',
    'شعبه',
    'کد ملی',
    'حقیقی / حقوقی',
    'تاریخ آخرین درخواست',
    'وضعیت سبد گردانی مشتری',
  ]

  static directMap(key) {
    if (key === null) return null
    return this.#mappingList[key]
  }

  static reverseMap(value) {
    if (value === null) return null
    return Object.keys(this.#mappingList).find(
      (key) => this.#mappingList[key] === value
    )
  }

  static getNumericTypeValue() {
    return this.#numericTypeValue
  }

  static getStringTypeValue() {
    return this.#stringTypeValue
  }
}
