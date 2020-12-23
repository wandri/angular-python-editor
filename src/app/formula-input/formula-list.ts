import { Formula } from './formula';

export const storedFormulas: Formula[] = [
  {
    name: 'ARRAY_CONSTRAIN',
    syntax: 'ARRAY_CONSTRAIN(input_range, num_rows, num_cols)',
    description: 'Constrains an array result to a specified size.'
  }, {
    name: 'FLATTEN',
    syntax: 'FLATTEN(range1,[range2,...])',
    description: 'See FLATTEN.'
  }, {
    name: 'FREQUENCY',
    syntax: 'FREQUENCY(data, classes)',
    description: 'Calculates the frequency distribution of a one-column array into specified classes.'
  }, {
    name: 'GROWTH',
    syntax: 'GROWTH(known_data_y, [known_data_x], [new_data_x], [b])',
    description: 'Given partial data about an exponential growth trend, fits an ideal exponential growth trend and/or predicts further values.'
  }, {
    name: 'LINEST',
    syntax: 'LINEST(known_data_y, [known_data_x], [calculate_b], [verbose])',
    description: 'Given partial data about a linear trend, calculates various parameters about the ideal linear trend using the least-squares method.'
  }, {
    name: 'LOGEST',
    syntax: 'LOGEST(known_data_y, [known_data_x], [b], [verbose])',
    description: 'Given partial data about an exponential growth curve, calculates various parameters about the best fit ideal exponential growth curve.'
  }, {
    name: 'MDETERM',
    syntax: 'MDETERM(square_matrix)',
    description: 'Returns the matrix determinant of a square matrix specified as an array or range.'
  }, {
    name: 'MINVERSE',
    syntax: 'MINVERSE(square_matrix)',
    description: 'Returns the multiplicative inverse of a square matrix specified as an array or range.'
  }, {
    name: 'MMULT',
    syntax: 'MMULT(matrix1, matrix2)',
    description: 'Calculates the matrix product of two matrices specified as arrays or ranges.'
  }, {
    name: 'SUMPRODUCT',
    syntax: 'SUMPRODUCT(array1, [array2, ...])',
    description: 'Calculates the sum of the products of corresponding entries in two equal-sized arrays or ranges.'
  }, {
    name: 'SUMX2MY2',
    syntax: 'SUMX2MY2(array_x, array_y)',
    description: 'Calculates the sum of the differences of the squares of values in two arrays.'
  }, {
    name: 'SUMX2PY2',
    syntax: 'SUMX2PY2(array_x, array_y)',
    description: 'Calculates the sum of the sums of the squares of values in two arrays.'
  }, {
    name: 'SUMXMY2',
    syntax: 'SUMXMY2(array_x, array_y)',
    description: 'Calculates the sum of the squares of differences of values in two arrays.'
  }, {
    name: 'TRANSPOSE',
    syntax: 'TRANSPOSE(array_or_range)',
    description: 'Transposes the rows and columns of an array or range of cells.'
  }, {
    name: 'TREND',
    syntax: 'TREND(known_data_y, [known_data_x], [new_data_x], [b])',
    description: 'Given partial data about a linear trend, fits an ideal linear trend using the least squares method and/or predicts further values.'
  }, {
    name: 'DAVERAGE',
    syntax: 'DAVERAGE(database, field, criteria)',
    description: 'Returns the average of a set of values selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DCOUNT',
    syntax: 'DCOUNT(database, field, criteria)',
    description: 'Counts numeric values selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DCOUNTA',
    syntax: 'DCOUNTA(database, field, criteria)',
    description: 'Counts values, including text, selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DGET',
    syntax: 'DGET(database, field, criteria)',
    description: 'Returns a single value from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DMAX',
    syntax: 'DMAX(database, field, criteria)',
    description: 'Returns the maximum value selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DMIN',
    syntax: 'DMIN(database, field, criteria)',
    description: 'Returns the minimum value selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DPRODUCT',
    syntax: 'DPRODUCT(database, field, criteria)',
    description: 'Returns the product of values selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DSTDEV',
    syntax: 'DSTDEV(database, field, criteria)',
    description: 'Returns the standard deviation of a population sample selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DSTDEVP',
    syntax: 'DSTDEVP(database, field, criteria)',
    description: 'Returns the standard deviation of an entire population selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DSUM',
    syntax: 'DSUM(database, field, criteria)',
    description: 'Returns the sum of values selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DVAR',
    syntax: 'DVAR(database, field, criteria)',
    description: 'Returns the variance of a population sample selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DVARP',
    syntax: 'DVARP(database, field, criteria)',
    description: 'Returns the variance of an entire population selected from a database table-like array or range using a SQL-like query.'
  }, {
    name: 'DATE',
    syntax: 'DATE(year, month, day)',
    description: 'Converts a provided year, month, and day into a date.'
  }, {
    name: 'DATEDIF',
    syntax: 'DATEDIF(start_date, end_date, unit)',
    description: 'Calculates the number of days, months, or years between two dates.'
  }, {
    name: 'DATEVALUE',
    syntax: 'DATEVALUE(date_string)',
    description: 'Converts a provided date string in a known format to a date value.'
  }, {
    name: 'DAY',
    syntax: 'DAY(date)',
    description: 'Returns the day of the month that a specific date falls on, in numeric format.'
  }, {
    name: 'DAYS',
    syntax: 'DAYS(end_date, start_date)',
    description: 'Returns the number of days between two dates.'
  }, {
    name: 'DAYS360',
    syntax: 'DAYS360(start_date, end_date, [method])',
    description: 'Returns the difference between two days based on the 360 day year used in some financial interest calculations.'
  }, {
    name: 'EDATE',
    syntax: 'EDATE(start_date, months)',
    description: 'Returns a date a specified number of months before or after another date.'
  }, {
    name: 'EOMONTH',
    syntax: 'EOMONTH(start_date, months)',
    description: 'Returns a date representing the last day of a month which falls a specified number of months before or after another date.'
  }, {
    name: 'HOUR',
    syntax: 'HOUR(time)',
    description: 'Returns the hour component of a specific time, in numeric format.'
  }, {
    name: 'ISOWEEKNUM',
    syntax: 'ISOWEEKNUM(date)',
    description: 'Returns the number of the ISO week of the year where the provided date falls.'
  }, {
    name: 'MINUTE',
    syntax: 'MINUTE(time)',
    description: 'Returns the minute component of a specific time, in numeric format.'
  }, {
    name: 'MONTH',
    syntax: 'MONTH(date)',
    description: 'Returns the month of the year a specific date falls in, in numeric format.'
  }, {
    name: 'NETWORKDAYS',
    syntax: 'NETWORKDAYS(start_date, end_date, [holidays])',
    description: 'Returns the number of net working days between two provided days.'
  }, {
    name: 'NETWORKDAYS.INTL',
    syntax: 'NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])',
    description: 'Returns the number of net working days between two provided days excluding specified weekend days and holidays.'
  }, {
    name: 'NOW',
    syntax: 'NOW()',
    description: 'Returns the current date and time as a date value.'
  }, {
    name: 'SECOND',
    syntax: 'SECOND(time)',
    description: 'Returns the second component of a specific time, in numeric format.'
  }, {
    name: 'TIME',
    syntax: 'TIME(hour, minute, second)',
    description: 'Converts a provided hour, minute, and second into a time.'
  }, {
    name: 'TIMEVALUE',
    syntax: 'TIMEVALUE(time_string)',
    description: 'Returns the fraction of a 24-hour day the time represents.'
  }, {
    name: 'TODAY',
    syntax: 'TODAY()',
    description: 'Returns the current date as a date value.'
  }, {
    name: 'WEEKDAY',
    syntax: 'WEEKDAY(date, [type])',
    description: 'Returns a number representing the day of the week of the date provided.'
  }, {
    name: 'WEEKNUM',
    syntax: 'WEEKNUM(date, [type])',
    description: 'Returns a number representing the week of the year where the provided date falls.'
  }, {
    name: 'WORKDAY',
    syntax: 'WORKDAY(start_date, num_days, [holidays])',
    description: 'Calculates the end date after a specified number of working days.'
  }, {
    name: 'WORKDAY.INTL',
    syntax: 'WORKDAY.INTL(start_date, num_days, [weekend], [holidays])',
    description: 'Calculates the date after a specified number of workdays excluding specified weekend days and holidays.'
  }, {
    name: 'YEAR',
    syntax: 'YEAR(date)',
    description: 'Returns the year specified by a given date.'
  }, {
    name: 'YEARFRAC',
    syntax: 'YEARFRAC(start_date, end_date, [day_count_convention])',
    description: 'Returns the number of years, including fractional years, between two dates using a specified day count convention.'
  }, {
    name: 'BIN2DEC',
    syntax: 'BIN2DEC(signed_binary_number)',
    description: 'Converts a signed binary number to decimal format.'
  }, {
    name: 'BIN2HEX',
    syntax: 'BIN2HEX(signed_binary_number, [significant_digits])',
    description: 'Converts a signed binary number to signed hexadecimal format.'
  }, {
    name: 'BIN2OCT',
    syntax: 'BIN2OCT(signed_binary_number, [significant_digits])',
    description: 'Converts a signed binary number to signed octal format.'
  }, {
    name: 'BITAND',
    syntax: 'BITAND(value1, value2)',
    description: 'Bitwise boolean AND of two numbers.'
  }, {
    name: 'BITLSHIFT',
    syntax: 'BITLSHIFT(value, shift_amount)',
    description: 'Shifts the bits of the input a certain number of places to the left.'
  }, {
    name: 'BITOR',
    syntax: 'BITOR(value1, value2)',
    description: 'Bitwise boolean OR of 2 numbers.'
  }, {
    name: 'BITRSHIFT',
    syntax: 'BITRSHIFT(value, shift_amount)',
    description: 'Shifts the bits of the input a certain number of places to the right.'
  }, {
    name: 'BITXOR',
    syntax: 'BITXOR(value1, value2)',
    description: 'Bitwise XOR (exclusive OR) of 2 numbers.'
  }, {
    name: 'COMPLEX',
    syntax: 'COMPLEX(real_part, imaginary_part, [suffix])',
    description: 'Creates a complex number given real and imaginary coefficients.'
  }, {
    name: 'DEC2BIN',
    syntax: 'DEC2BIN(decimal_number, [significant_digits])',
    description: 'Converts a decimal number to signed binary format.'
  }, {
    name: 'DEC2HEX',
    syntax: 'DEC2HEX(decimal_number, [significant_digits])',
    description: 'Converts a decimal number to signed hexadecimal format.'
  }, {
    name: 'DEC2OCT',
    syntax: 'DEC2OCT(decimal_number, [significant_digits])',
    description: 'Converts a decimal number to signed octal format.'
  }, {
    name: 'DELTA',
    syntax: 'DELTA(number1, [number2])',
    description: 'Compare two numeric values, returning 1 if they\'re equal.'
  }, {
    name: 'ERF',
    syntax: 'ERF(lower_bound, [upper_bound])',
    description: 'The ERF function returns the integral of the Gauss error function over an interval of values.'
  }, {
    name: 'ERF.PRECISE',
    syntax: 'ERF.PRECISE(lower_bound, [upper_bound])',
    description: 'See ERF '
  }, {
    name: 'GESTEP',
    syntax: 'GESTEP(value, [step])',
    description: 'Returns 1 if the rate is strictly greater than or equal to the provided step value or 0 otherwiseIf no step value is provided then the default value of 0 will be used.'
  }, {
    name: 'HEX2BIN',
    syntax: 'HEX2BIN(signed_hexadecimal_number, [significant_digits])',
    description: 'Converts a signed hexadecimal number to signed binary format.'
  }, {
    name: 'HEX2DEC',
    syntax: 'HEX2DEC(signed_hexadecimal_number)',
    description: 'Converts a signed hexadecimal number to decimal format.'
  }, {
    name: 'HEX2OCT',
    syntax: 'HEX2OCT(signed_hexadecimal_number, significant_digits)',
    description: 'Converts a signed hexadecimal number to signed octal format.'
  }, {
    name: 'IMABS',
    syntax: 'IMABS(number)',
    description: 'Returns absolute value of a complex number.'
  }, {
    name: 'IMAGINARY',
    syntax: 'IMAGINARY(complex_number)',
    description: 'Returns the imaginary coefficient of a complex number.'
  }, {
    name: 'IMARGUMENT',
    syntax: 'IMARGUMENT(number)',
    description: 'The IMARGUMENT function returns the angle (also known as the argument or \theta) of the given complex number in radians.'
  }, {
    name: 'IMCONJUGATE',
    syntax: 'IMCONJUGATE(number)',
    description: 'Returns the complex conjugate of a number.'
  }, {
    name: 'IMCOS',
    syntax: 'IMCOS(number)',
    description: 'The IMCOS function returns the cosine of the given complex number.'
  }, {
    name: 'IMCOSH',
    syntax: 'IMCOSH(number)',
    description: 'Returns the hyperbolic cosine of the given complex numberFor example, a given complex number "x+yi" returns "cosh(x+yi)." .'
  }, {
    name: 'IMCOT',
    syntax: 'IMCOT(number)',
    description: 'Returns the cotangent of the given complex numberFor example, a given complex number "x+yi" returns "cot(x+yi)." .'
  }, {
    name: 'IMCOTH',
    syntax: 'IMCOTH(number)',
    description: 'Returns the hyperbolic cotangent of the given complex numberFor example, a given complex number "x+yi" returns "coth(x+yi).".'
  }, {
    name: 'IMCSC',
    syntax: 'IMCSC(number)',
    description: 'Returns the cosecant of the given complex number.'
  }, {
    name: 'IMCSCH',
    syntax: 'IMCSCH(number)',
    description: 'Returns the hyperbolic cosecant of the given complex numberFor example, a given complex number "x+yi" returns "csch(x+yi).".'
  }, {
    name: 'IMDIV',
    syntax: 'IMDIV(dividend, divisor)',
    description: 'Returns one complex number divided by another.'
  }, {
    name: 'IMEXP',
    syntax: 'IMEXP(exponent)',
    description: 'Returns Euler\'s number, e (~2.718) raised to a complex power.'
  }, {
    name: 'IMLOG',
    syntax: 'IMLOG(value, base)',
    description: 'Returns the logarithm of a complex number for a specified base.'
  }, {
    name: 'IMLOG10',
    syntax: 'IMLOG10(value)',
    description: 'Returns the logarithm of a complex number with base 10.'
  }, {
    name: 'IMLOG2',
    syntax: 'IMLOG2(value)',
    description: 'Returns the logarithm of a complex number with base 2.'
  }, {
    name: 'IMPRODUCT',
    syntax: 'IMPRODUCT(factor1, [factor2, ...])',
    description: 'Returns the result of multiplying a series of complex numbers together.'
  }, {
    name: 'IMREAL',
    syntax: 'IMREAL(complex_number)',
    description: 'Returns the real coefficient of a complex number.'
  }, {
    name: 'IMSEC',
    syntax: 'IMSEC(number)',
    description: 'Returns the secant of the given complex numberFor example, a given complex number "x+yi" returns "sec(x+yi).".'
  }, {
    name: 'IMSECH',
    syntax: 'IMSECH(number)',
    description: 'Returns the hyperbolic secant of the given complex numberFor example, a given complex number "x+yi" returns "sech(x+yi).".'
  }, {
    name: 'IMSIN',
    syntax: 'IMSIN (number)',
    description: 'Returns the sine of the given complex number.'
  }, {
    name: 'IMSINH',
    syntax: 'IMSINH(number)',
    description: 'Returns the hyperbolic sine of the given complex numberFor example, a given complex number "x+yi" returns "sinh(x+yi).".'
  }, {
    name: 'IMSUB',
    syntax: 'IMSUB(first_number, second_number)',
    description: 'Returns the difference between two complex numbers.'
  }, {
    name: 'IMSUM',
    syntax: 'IMSUM(value1, [value2, ...])',
    description: 'Returns the sum of a series of complex numbers.'
  }, {
    name: 'IMTAN',
    syntax: 'IMTAN(number)',
    description: 'Returns the tangent of the given complex number.'
  }, {
    name: 'IMTANH',
    syntax: 'IMTANH(number)',
    description: 'Returns the hyperbolic tangent of the given complex numberFor example, a given complex number "x+yi" returns "tanh(x+yi).".'
  }, {
    name: 'OCT2BIN',
    syntax: 'OCT2BIN(signed_octal_number, [significant_digits])',
    description: 'Converts a signed octal number to signed binary format.'
  }, {
    name: 'OCT2DEC',
    syntax: 'OCT2DEC(signed_octal_number)',
    description: 'Converts a signed octal number to decimal format.'
  }, {
    name: 'OCT2HEX',
    syntax: 'OCT2HEX(signed_octal_number, [significant_digits])',
    description: 'Converts a signed octal number to signed hexadecimal format.'
  }, {
    name: 'FILTER',
    syntax: 'FILTER(range, condition1, [condition2])',
    description: 'Returns a filtered version of the source range, returning only rows or columns which meet the specified conditions.'
  }, {
    name: 'SORT',
    syntax: 'SORT(range, sort_column, is_ascending, [sort_column2], [is_ascending2])',
    description: 'Sorts the rows of a given array or range by the values in one or more columns.'
  }, {
    name: 'SORTN',
    syntax: 'SORTN(range, [n], [display_ties_mode], [sort_column1, is_ascending1], ...)',
    description: 'Returns the first n items in a data set after performing a sort.'
  }, {
    name: 'UNIQUE',
    syntax: 'UNIQUE(range)',
    description: 'Returns unique rows in the provided source range, discarding duplicatesRows are returned in the order in which they first appear in the source range.'
  }, {
    name: 'ACCRINT',
    syntax: 'ACCRINT(issue, first_payment, settlement, rate, redemption, frequency, [day_count_convention])',
    description: 'Calculates the accrued interest of a security that has periodic payments.'
  }, {
    name: 'ACCRINTM',
    syntax: 'ACCRINTM(issue, maturity, rate, [redemption], [day_count_convention])',
    description: 'Calculates the accrued interest of a security that pays interest at maturity.'
  }, {
    name: 'AMORLINC',
    syntax: 'AMORLINC(cost, purchase_date, first_period_end, salvage, period, rate, [basis])',
    description: 'Returns the depreciation for an accounting period, or the prorated depreciation if the asset was purchased in the middle of a period.'
  }, {
    name: 'COUPDAYBS',
    syntax: 'COUPDAYBS(settlement, maturity, frequency, [day_count_convention])',
    description: 'Calculates the number of days from the first coupon, or interest payment, until settlement.'
  }, {
    name: 'COUPDAYS',
    syntax: 'COUPDAYS(settlement, maturity, frequency, [day_count_convention])',
    description: 'Calculates the number of days in the coupon, or interest payment, period that contains the specified settlement date.'
  }, {
    name: 'COUPDAYSNC',
    syntax: 'COUPDAYSNC(settlement, maturity, frequency, [day_count_convention])',
    description: 'Calculates the number of days from the settlement date until the next coupon, or interest payment.'
  }, {
    name: 'COUPNCD',
    syntax: 'COUPNCD(settlement, maturity, frequency, [day_count_convention])',
    description: 'Calculates next coupon, or interest payment, date after the settlement date.'
  }, {
    name: 'COUPNUM',
    syntax: 'COUPNUM(settlement, maturity, frequency, [day_count_convention])',
    description: 'Calculates the number of coupons, or interest payments, between the settlement date and the maturity date of the investment.'
  }, {
    name: 'COUPPCD',
    syntax: 'COUPPCD(settlement, maturity, frequency, [day_count_convention])',
    description: 'Calculates last coupon, or interest payment, date before the settlement date.'
  }, {
    name: 'CUMIPMT',
    syntax: 'CUMIPMT(rate, number_of_periods, present_value, first_period, last_period, end_or_beginning)',
    description: 'Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    name: 'CUMPRINC',
    syntax: 'CUMPRINC(rate, number_of_periods, present_value, first_period, last_period, end_or_beginning)',
    description: 'Calculates the cumulative principal paid over a range of payment periods for an investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    name: 'DB',
    syntax: 'DB(cost, salvage, life, period, [month])',
    description: 'Calculates the depreciation of an asset for a specified period using the arithmetic declining balance method.'
  }, {
    name: 'DDB',
    syntax: 'DDB(cost, salvage, life, period, [factor])',
    description: 'Calculates the depreciation of an asset for a specified period using the double-declining balance method.'
  }, {
    name: 'DISC',
    syntax: 'DISC(settlement, maturity, price, redemption, [day_count_convention])',
    description: 'Calculates the discount rate of a security based on price.'
  }, {
    name: 'DOLLARDE',
    syntax: 'DOLLARDE(fractional_price, unit)',
    description: 'Converts a price quotation given as a decimal fraction into a decimal value.'
  }, {
    name: 'DOLLARFR',
    syntax: 'DOLLARFR(decimal_price, unit)',
    description: 'Converts a price quotation given as a decimal value into a decimal fraction.'
  }, {
    name: 'DURATION',
    syntax: 'DURATION(settlement, maturity, rate, yield, frequency, [day_count_convention]) .',
    description: 'Calculates the number of compounding periods required for an investment of a specified present value appreciating at a given rate to reach a target value.'
  }, {
    name: 'EFFECT',
    syntax: 'EFFECT(nominal_rate, periods_per_year)',
    description: 'Calculates the annual effective interest rate given the nominal rate and number of compounding periods per year.'
  }, {
    name: 'FV',
    syntax: 'FV(rate, number_of_periods, payment_amount, [present_value], [end_or_beginning])',
    description: 'Calculates the future value of an annuity investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    name: 'FVSCHEDULE',
    syntax: 'FVSCHEDULE(principal, rate_schedule)',
    description: 'Calculates the future value of some principal based on a specified series of potentially varying interest rates.'
  }, {
    name: 'INTRATE',
    syntax: 'INTRATE(buy_date, sell_date, buy_price, sell_price, [day_count_convention])',
    description: 'Calculates the effective interest rate generated when an investment is purchased at one price and sold at another with no interest or dividends generated by the investment itself.'
  }, {
    name: 'IPMT',
    syntax: 'IPMT(rate, period, number_of_periods, present_value, [future_value], [end_or_beginning])',
    description: 'Calculates the payment on interest for an investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    name: 'IRR',
    syntax: 'IRR(cashflow_amounts, [rate_guess])',
    description: 'Calculates the internal rate of return on an investment based on a series of periodic cash flows.'
  }, {
    name: 'ISPMT',
    syntax: 'ISPMT(rate, period, number_of_periods, present_value)',
    description: 'The ISPMT function calculates the interest paid during a particular period of an investment.'
  }, {
    name: 'MDURATION',
    syntax: 'MDURATION(settlement, maturity, rate, yield, frequency, [day_count_convention])',
    description: 'Calculates the modified Macaulay duration of a security paying periodic interest, such as a US Treasury Bond, based on expected yield.'
  }, {
    name: 'MIRR',
    syntax: 'MIRR(cashflow_amounts, financing_rate, reinvestment_return_rate)',
    description: 'Calculates the modified internal rate of return on an investment based on a series of periodic cash flows and the difference between the interest rate paid on financing versus the return received on reinvested income.'
  }, {
    name: 'NOMINAL',
    syntax: 'NOMINAL(effective_rate, periods_per_year)',
    description: 'Calculates the annual nominal interest rate given the effective rate and number of compounding periods per year.'
  }, {
    name: 'NPER',
    syntax: 'NPER(rate, payment_amount, present_value, [future_value], [end_or_beginning])',
    description: 'Calculates the number of payment periods for an investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    name: 'NPV',
    syntax: 'NPV(discount, cashflow1, [cashflow2, ...])',
    description: 'Calculates the net present value of an investment based on a series of periodic cash flows and a discount rate.'
  }, {
    name: 'PDURATION',
    syntax: 'PDURATION(rate, present_value, future_value)',
    description: 'Returns the number of periods for an investment to reach a specific value at a given rate.'
  }, {
    name: 'PMT',
    syntax: 'PMT(rate, number_of_periods, present_value, [future_value], [end_or_beginning])',
    description: 'Calculates the periodic payment for an annuity investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    name: 'PPMT',
    syntax: 'PPMT(rate, period, number_of_periods, present_value, [future_value], [end_or_beginning])',
    description: 'Calculates the payment on the principal of an investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    name: 'PRICE',
    syntax: 'PRICE(settlement, maturity, rate, yield, redemption, frequency, [day_count_convention])',
    description: 'Calculates the price of a security paying periodic interest, such as a US Treasury Bond, based on expected yield.'
  }, {
    name: 'PRICEDISC',
    syntax: 'PRICEDISC(settlement, maturity, discount, redemption, [day_count_convention])',
    description: 'Calculates the price of a discount (non-interest-bearing) security, based on expected yield.'
  }, {
    name: 'PRICEMAT',
    syntax: 'PRICEMAT(settlement, maturity, issue, rate, yield, [day_count_convention])',
    description: 'Calculates the price of a security paying interest at maturity, based on expected yield.'
  }, {
    name: 'PV',
    syntax: 'PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning])',
    description: 'Calculates the present value of an annuity investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    name: 'RATE',
    syntax: 'RATE(number_of_periods, payment_per_period, present_value, [future_value], [end_or_beginning], [rate_guess])',
    description: 'Calculates the interest rate of an annuity investment based on constant-amount periodic payments and the assumption of a constant interest rate.'
  }, {
    name: 'RECEIVED',
    syntax: 'RECEIVED(settlement, maturity, investment, discount, [day_count_convention])',
    description: 'Calculates the amount received at maturity for an investment in fixed-income securities purchased on a given date.'
  }, {
    name: 'RRI',
    syntax: 'RRI(number_of_periods, present_value, future_value)',
    description: 'Returns the interest rate needed for an investment to reach a specific value within a given number of periods.'
  }, {
    name: 'SLN',
    syntax: 'SLN(cost, salvage, life)',
    description: 'Calculates the depreciation of an asset for one period using the straight-line method.'
  }, {
    name: 'SYD',
    syntax: 'SYD(cost, salvage, life, period)',
    description: 'Calculates the depreciation of an asset for a specified period using the sum of years digits method.'
  }, {
    name: 'TBILLEQ',
    syntax: 'TBILLEQ(settlement, maturity, discount)',
    description: 'Calculates the equivalent annualized rate of return of a US Treasury Bill based on discount rate.'
  }, {
    name: 'TBILLPRICE',
    syntax: 'TBILLPRICE(settlement, maturity, discount)',
    description: 'Calculates the price of a US Treasury Bill based on discount rate.'
  }, {
    name: 'TBILLYIELD',
    syntax: 'TBILLYIELD(settlement, maturity, price)',
    description: 'Calculates the yield of a US Treasury Bill based on price.'
  }, {
    name: 'VDB',
    syntax: 'VDB(cost, salvage, life, start_period, end_period, [factor], [no_switch])',
    description: 'Returns the depreciation of an asset for a particular period (or partial period).'
  }, {
    name: 'XIRR',
    syntax: 'XIRR(cashflow_amounts, cashflow_dates, [rate_guess])',
    description: 'Calculates the internal rate of return of an investment based on a specified series of potentially irregularly spaced cash flows.'
  }, {
    name: 'XNPV',
    syntax: 'XNPV(discount, cashflow_amounts, cashflow_dates)',
    description: 'Calculates the net present value of an investment based on a specified series of potentially irregularly spaced cash flows and a discount rate.'
  }, {
    name: 'YIELD',
    syntax: 'YIELD(settlement, maturity, rate, price, redemption, frequency, [day_count_convention])',
    description: 'Calculates the annual yield of a security paying periodic interest, such as a US Treasury Bond, based on price.'
  }, {
    name: 'YIELDDISC',
    syntax: 'YIELDDISC(settlement, maturity, price, redemption, [day_count_convention])',
    description: 'Calculates the annual yield of a discount (non-interest-bearing) security, based on price.'
  }, {
    name: 'YIELDMAT',
    syntax: 'YIELDMAT(settlement, maturity, issue, rate, price, [day_count_convention])',
    description: 'Calculates the annual yield of a security paying interest at maturity, based on price.'
  }, {
    name: 'ARRAYFORMULA',
    syntax: 'ARRAYFORMULA(array_formula)',
    description: 'Enables the display of values returned from an array formula into multiple rows and/or columns and the use of non-array functions with arrays.'
  }, {
    name: 'DETECTLANGUAGE',
    syntax: 'DETECTLANGUAGE(text_or_range)',
    description: 'Identifies the language used in text within the specified range.'
  }, {
    name: 'GOOGLEFINANCE',
    syntax: 'GOOGLEFINANCE(ticker, [attribute], [start_date], [end_date|num_days], [interval])',
    description: 'Fetches current or historical securities information from Google Finance.'
  }, {
    name: 'GOOGLETRANSLATE',
    syntax: 'GOOGLETRANSLATE(text, [source_language], [target_language])',
    description: 'Translates text from one language into another'
  }, {
    name: 'IMAGE',
    syntax: 'IMAGE(url, [mode], [height], [width])',
    description: 'Inserts an image into a cell.'
  }, {
    name: 'QUERY',
    syntax: 'QUERY(data, query, [headers])',
    description: 'Runs a Google Visualization API Query Language query across data.'
  }, {
    name: 'SPARKLINE',
    syntax: 'SPARKLINE(data, [options])',
    description: 'Creates a miniature chart contained within a single cell.'
  }, {
    name: 'ERROR.TYPE',
    syntax: 'ERROR.TYPE(reference)',
    description: 'Returns a number corresponding to the error value in a different cell.'
  }, {
    name: 'ISBLANK',
    syntax: 'ISBLANK(value)',
    description: 'Checks whether the referenced cell is empty.'
  }, {
    name: 'ISDATE',
    syntax: 'ISDATE(value)',
    description: 'Returns whether a value is a date.'
  }, {
    name: 'ISEMAIL',
    syntax: 'ISEMAIL(value)',
    description: 'Checks whether a value is a valid email address.'
  }, {
    name: 'ISERR',
    syntax: 'ISERR(value)',
    description: 'Checks whether a value is an error other than `#N/A`.'
  }, {
    name: 'ISERROR',
    syntax: 'ISERROR(value)',
    description: 'Checks whether a value is an error.'
  }, {
    name: 'ISFORMULA',
    syntax: 'ISFORMULA(cell)',
    description: 'Checks whether a formula is in the referenced cell.'
  }, {
    name: 'ISLOGICAL',
    syntax: 'ISLOGICAL(value)',
    description: 'Checks whether a value is `TRUE` or `FALSE`.'
  }, {
    name: 'ISNA',
    syntax: 'ISNA(value)',
    description: 'Checks whether a value is the error `#N/A`.'
  }, {
    name: 'ISNONTEXT',
    syntax: 'ISNONTEXT(value)',
    description: 'Checks whether a value is non-textual.'
  }, {
    name: 'ISNUMBER',
    syntax: 'ISNUMBER(value)',
    description: 'Checks whether a value is a number.'
  }, {
    name: 'ISREF',
    syntax: 'ISREF(value)',
    description: 'Checks whether a value is a valid cell reference.'
  }, {
    name: 'ISTEXT',
    syntax: 'ISTEXT(value)',
    description: 'Checks whether a value is text.'
  }, {
    name: 'N',
    syntax: 'N(value)',
    description: 'Returns the argument provided as a number.'
  }, {
    name: 'NA',
    syntax: 'NA()',
    description: 'Returns the "value not available" error, `#N/A`.'
  }, {
    name: 'TYPE',
    syntax: 'TYPE(value)',
    description: 'Returns a number associated with the type of data passed into the function.'
  }, {
    name: 'CELL',
    syntax: 'CELL(info_type, reference)',
    description: 'Returns the requested information about the specified cell.'
  }, {
    name: 'AND',
    syntax: 'AND(logical_expression1, [logical_expression2, ...])',
    description: 'Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.'
  }, {
    name: 'FALSE',
    syntax: 'FALSE()',
    description: 'Returns the logical value `FALSE`.'
  }, {
    name: 'IF',
    syntax: 'IF(logical_expression, value_if_true, value_if_false)',
    description: 'Returns one value if a logical expression is `TRUE` and another if it is `FALSE`.'
  }, {
    name: 'IFERROR',
    syntax: 'IFERROR(value, [value_if_error])',
    description: 'Returns the first argument if it is not an error value, otherwise returns the second argument if present, or a blank if the second argument is absent.'
  }, {
    name: 'IFNA',
    syntax: 'IFNA(value, value_if_na)',
    description: 'Evaluates a valueIf the value is an #N/A error, returns the specified value.'
  }, {
    name: 'IFS',
    syntax: 'IFS(condition1, value1, [condition2, value2], …)',
    description: 'Evaluates multiple conditions and returns a value that corresponds to the first true condition'
  }, {
    name: 'NOT',
    syntax: 'NOT(logical_expression)',
    description: 'Returns the opposite of a logical value - `NOT(TRUE)` returns `FALSE`; `NOT(FALSE)` returns `TRUE`.'
  }, {
    name: 'OR',
    syntax: 'OR(logical_expression1, [logical_expression2, ...])',
    description: 'Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false.'
  }, {
    name: 'SWITCH',
    syntax: 'SWITCH(expression, case1, value1, [default or case2, value2], …)',
    description: 'Tests an expression against a list of cases and returns the corresponding value of the first matching case, with an optional default value if nothing else is met.'
  }, { name: 'TRUE', syntax: 'TRUE()', description: 'Returns the logical value `TRUE`.' }, {
    name: 'XOR',
    syntax: 'XOR(logical_expression1, [logical_expression2, ...])',
    description: 'The XOR function performs an exclusive or of 2 numbers that returns a 1 if the numbers are different, and a 0 otherwise.'
  }, {
    name: 'ADDRESS',
    syntax: 'ADDRESS(row, column, [absolute_relative_mode], [use_a1_notation], [sheet])',
    description: 'Returns a cell reference as a string.'
  }, {
    name: 'CHOOSE',
    syntax: 'CHOOSE(index, choice1, [choice2, ...])',
    description: 'Returns an element from a list of choices based on index.'
  }, {
    name: 'COLUMN',
    syntax: 'COLUMN([cell_reference])',
    description: 'Returns the column number of a specified cell, with `A=1`.'
  }, {
    name: 'COLUMNS',
    syntax: 'COLUMNS(range)',
    description: 'Returns the number of columns in a specified array or range.'
  }, {
    name: 'FORMULATEXT',
    syntax: 'FORMULATEXT(cell)',
    description: 'Returns the formula as a string.'
  }, {
    name: 'GETPIVOTDATA',
    syntax: 'GETPIVOTDATA(value_name, any_pivot_table_cell, [original_column, ...], [pivot_item, ...]',
    description: 'Extracts an aggregated value from a pivot table that corresponds to the specified row and column headings.'
  }, {
    name: 'HLOOKUP',
    syntax: 'HLOOKUP(search_key, range, index, [is_sorted])',
    description: 'Horizontal lookupSearches across the first row of a range for a key and returns the value of a specified cell in the column found.'
  }, {
    name: 'INDEX',
    syntax: 'INDEX(reference, [row], [column])',
    description: 'Returns the content of a cell, specified by row and column offset.'
  }, {
    name: 'INDIRECT',
    syntax: 'INDIRECT(cell_reference_as_string, [is_A1_notation])',
    description: 'Returns a cell reference specified by a string.'
  }, {
    name: 'LOOKUP',
    syntax: 'LOOKUP(search_key, search_range|search_result_array, [result_range])',
    description: 'Looks through a row or column for a key and returns the value of the cell in a result range located in the same position as the search row or column.'
  }, {
    name: 'MATCH',
    syntax: 'MATCH(search_key, range, [search_type])',
    description: 'Returns the relative position of an item in a range that matches a specified value.'
  }, {
    name: 'OFFSET',
    syntax: 'OFFSET(cell_reference, offset_rows, offset_columns, [height], [width])',
    description: 'Returns a range reference shifted a specified number of rows and columns from a starting cell reference.'
  }, {
    name: 'ROW',
    syntax: 'ROW([cell_reference])',
    description: 'Returns the row number of a specified cell.'
  }, {
    name: 'ROWS',
    syntax: 'ROWS(range)',
    description: 'Returns the number of rows in a specified array or range.'
  }, {
    name: 'VLOOKUP',
    syntax: 'VLOOKUP(search_key, range, index, [is_sorted])',
    description: 'Vertical lookupSearches down the first column of a range for a key and returns the value of a specified cell in the row found.'
  }, {
    name: 'ABS',
    syntax: 'ABS(value)',
    description: 'Returns the absolute value of a number.'
  }, {
    name: 'ACOS',
    syntax: 'ACOS(value)',
    description: 'Returns the inverse cosine of a value, in radians.'
  }, {
    name: 'ACOSH',
    syntax: 'ACOSH(value)',
    description: 'Returns the inverse hyperbolic cosine of a number.'
  }, {
    name: 'ACOT',
    syntax: 'ACOT(value)',
    description: 'Returns the inverse cotangent of a value, in radians.'
  }, {
    name: 'ACOTH',
    syntax: 'ACOTH(value)',
    description: 'Returns the inverse hyperbolic cotangent of a value, in radiansMust not be between -1 and 1, inclusive.'
  }, {
    name: 'ASIN',
    syntax: 'ASIN(value)',
    description: 'Returns the inverse sine of a value, in radians.'
  }, {
    name: 'ASINH',
    syntax: 'ASINH(value)',
    description: 'Returns the inverse hyperbolic sine of a number.'
  }, {
    name: 'ATAN',
    syntax: 'ATAN(value)',
    description: 'Returns the inverse tangent of a value, in radians.'
  }, {
    name: 'ATAN2',
    syntax: 'ATAN2(x, y)',
    description: 'Returns the angle between the x-axis and a line segment from the origin (0,0) to specified coordinate pair (`x`,`y`), in radians.'
  }, {
    name: 'ATANH',
    syntax: 'ATANH(value)',
    description: 'Returns the inverse hyperbolic tangent of a number.'
  }, {
    name: 'BASE',
    syntax: 'BASE(value, base, [min_length])',
    description: 'Converts a number into a text representation in another base, for example, base 2 for binary.'
  }, {
    name: 'CEILING',
    syntax: 'CEILING(value, [factor])',
    description: 'Rounds a number up to the nearest integer multiple of specified significance.'
  }, {
    name: 'CEILING.MATH',
    syntax: 'CEILING.MATH(number, [significance], [mode])',
    description: 'Rounds a number up to the nearest integer multiple of specified significance, with negative numbers rounding toward or away from 0 depending on the mode.'
  }, {
    name: 'CEILING.PRECISE',
    syntax: 'CEILING.PRECISE(number, [significance])',
    description: 'Rounds a number up to the nearest integer multiple of specified significanceIf the number is positive or negative, it is rounded up.'
  }, {
    name: 'COMBIN',
    syntax: 'COMBIN(n, k)',
    description: 'Returns the number of ways to choose some number of objects from a pool of a given size of objects.'
  }, {
    name: 'COMBINA',
    syntax: 'COMBINA(n, k)',
    description: 'Returns the number of ways to choose some number of objects from a pool of a given size of objects, including ways that choose the same object multiple times.'
  }, {
    name: 'COS',
    syntax: 'COS(angle)',
    description: 'Returns the cosine of an angle provided in radians.'
  }, {
    name: 'COSH',
    syntax: 'COSH(value)',
    description: 'Returns the hyperbolic cosine of any real number.'
  }, {
    name: 'COT',
    syntax: 'COT(angle)',
    description: 'Cotangent of an angle provided in radians.'
  }, {
    name: 'COTH',
    syntax: 'COTH(value)',
    description: 'Returns the hyperbolic cotangent of any real number.'
  }, {
    name: 'COUNTBLANK',
    syntax: 'COUNTBLANK(range)',
    description: 'Returns the number of empty cells in a given range.'
  }, {
    name: 'COUNTIF',
    syntax: 'COUNTIF(range, criterion)',
    description: 'Returns a conditional count across a range.'
  }, {
    name: 'COUNTIFS',
    syntax: 'COUNTIFS(criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    description: 'Returns the count of a range depending on multiple criteria.'
  }, {
    name: 'COUNTUNIQUE',
    syntax: 'COUNTUNIQUE(value1, [value2, ...])',
    description: 'Counts the number of unique values in a list of specified values and ranges.'
  }, {
    name: 'CSC',
    syntax: 'CSC(angle)',
    description: 'Returns the cosecant of an angle provided in radians.'
  }, {
    name: 'CSCH',
    syntax: 'CSCH(value)',
    description: 'The CSCH function returns the hyperbolic cosecant of any real number.'
  }, {
    name: 'DECIMAL',
    syntax: 'DECIMAL(value, base)',
    description: 'The DECIMAL function converts the text representation of a number in another base, to base 10 (decimal).'
  }, {
    name: 'DEGREES',
    syntax: 'DEGREES(angle)',
    description: 'Converts an angle value in radians to degrees.'
  }, {
    name: 'ERFC',
    syntax: 'ERFC(z)',
    description: 'Returns the complementary Gauss error function of a value.'
  }, { name: 'ERFC.PRECISE', syntax: 'ERFC.PRECISE(z)', description: 'See ERFC ' }, {
    name: 'EVEN',
    syntax: 'EVEN(value)',
    description: 'Rounds a number up to the nearest even integer.'
  }, {
    name: 'EXP',
    syntax: 'EXP(exponent)',
    description: 'Returns Euler\'s number, e (~2.718) raised to a power.'
  }, {
    name: 'FACT',
    syntax: 'FACT(value)',
    description: 'Returns the factorial of a number.'
  }, {
    name: 'FACTDOUBLE',
    syntax: 'FACTDOUBLE(value)',
    description: 'Returns the "double factorial" of a number.'
  }, {
    name: 'FLOOR',
    syntax: 'FLOOR(value, [factor])',
    description: 'Rounds a number down to the nearest integer multiple of specified significance.'
  }, {
    name: 'FLOOR.MATH',
    syntax: 'FLOOR.MATH(number, [significance], [mode])',
    description: 'Rounds a number down to the nearest integer multiple of specified significance, with negative numbers rounding toward or away from 0 depending on the mode.'
  }, {
    name: 'FLOOR.PRECISE',
    syntax: 'FLOOR.PRECISE(number, [significance])',
    description: 'The FLOOR.PRECISE function rounds a number down to the nearest integer or multiple of specified significance.'
  }, {
    name: 'GAMMALN',
    syntax: 'GAMMALN(value)',
    description: 'Returns the the logarithm of a specified Gamma function, base e (Euler\'s number).'
  }, {
    name: 'GAMMALN.PRECISE',
    syntax: 'GAMMALN.PRECISE(value)',
    description: 'See GAMMALN '
  }, {
    name: 'GCD',
    syntax: 'GCD(value1, value2)',
    description: 'Returns the greatest common divisor of one or more integers.'
  }, {
    name: 'IMLN',
    syntax: 'IMLN(complex_value)',
    description: 'Returns the logarithm of a complex number, base e (Euler\'s number).'
  }, {
    name: 'IMPOWER',
    syntax: 'IMPOWER(complex_base, exponent)',
    description: 'Returns a complex number raised to a power.'
  }, {
    name: 'IMSQRT',
    syntax: 'IMSQRT(complex_number)',
    description: 'Computes the square root of a complex number.'
  }, {
    name: 'INT',
    syntax: 'INT(value)',
    description: 'Rounds a number down to the nearest integer that is less than or equal to it.'
  }, {
    name: 'ISEVEN',
    syntax: 'ISEVEN(value)',
    description: 'Checks whether the provided value is even.'
  }, {
    name: 'ISO.CEILING',
    syntax: 'ISO.CEILING(number, [significance])',
    description: 'See CEILING.PRECISE '
  }, {
    name: 'ISODD',
    syntax: 'ISODD(value)',
    description: 'Checks whether the provided value is odd.'
  }, {
    name: 'LCM',
    syntax: 'LCM(value1, value2)',
    description: 'Returns the least common multiple of one or more integers.'
  }, {
    name: 'LN',
    syntax: 'LN(value)',
    description: 'Returns the the logarithm of a number, base e (Euler\'s number).'
  }, {
    name: 'LOG',
    syntax: 'LOG(value, base)',
    description: 'Returns the the logarithm of a number given a base.'
  }, {
    name: 'LOG10',
    syntax: 'LOG10(value)',
    description: 'Returns the the logarithm of a number, base 10.'
  }, {
    name: 'MOD',
    syntax: 'MOD(dividend, divisor)',
    description: 'Returns the result of the modulo operator, the remainder after a division operation.'
  }, {
    name: 'MROUND',
    syntax: 'MROUND(value, factor)',
    description: 'Rounds one number to the nearest integer multiple of another.'
  }, {
    name: 'MULTINOMIAL',
    syntax: 'MULTINOMIAL(value1, value2)',
    description: 'Returns the factorial of the sum of values divided by the product of the values\'factorials.'
  }, {
    name: 'MUNIT',
    syntax: 'MUNIT(dimension)',
    description: 'Returns a unit matrix of size dimension x dimension.'
  }, {
    name: 'ODD',
    syntax: 'ODD(value)',
    description: 'Rounds a number up to the nearest odd integer.'
  }, {
    name: 'PI',
    syntax: 'PI()',
    description: 'Returns the value of Pi to 14 decimal places.'
  }, {
    name: 'POWER',
    syntax: 'POWER(base, exponent)',
    description: 'Returns a number raised to a power.'
  }, {
    name: 'PRODUCT',
    syntax: 'PRODUCT(factor1, [factor2, ...])',
    description: 'Returns the result of multiplying a series of numbers together.'
  }, {
    name: 'QUOTIENT',
    syntax: 'QUOTIENT(dividend, divisor)',
    description: 'Returns one number divided by another.'
  }, {
    name: 'RADIANS',
    syntax: 'RADIANS(angle)',
    description: 'Converts an angle value in degrees to radians.'
  }, {
    name: 'RAND',
    syntax: 'RAND()',
    description: 'Returns a random number between 0 inclusive and 1 exclusive.'
  }, {
    name: 'RANDARRAY',
    syntax: 'RANDARRAY(rows, columns)',
    description: 'Generates an array of random numbers between 0 and 1.'
  }, {
    name: 'RANDBETWEEN',
    syntax: 'RANDBETWEEN(low, high)',
    description: 'Returns a uniformly random integer between two values, inclusive.'
  }, {
    name: 'ROUND',
    syntax: 'ROUND(value, [places])',
    description: 'Rounds a number to a certain number of decimal places according to standard rules.'
  }, {
    name: 'ROUNDDOWN',
    syntax: 'ROUNDDOWN(value, [places])',
    description: 'Rounds a number to a certain number of decimal places, always rounding down to the next valid increment.'
  }, {
    name: 'ROUNDUP',
    syntax: 'ROUNDUP(value, [places])',
    description: 'Rounds a number to a certain number of decimal places, always rounding up to the next valid increment.'
  }, {
    name: 'SEC',
    syntax: 'SEC(angle)',
    description: 'The SEC function returns the secant of an angle, measured in radians.'
  }, {
    name: 'SECH',
    syntax: 'SECH(value)',
    description: 'The SECH function returns the hyperbolic secant of an angle.'
  }, {
    name: 'SEQUENCE',
    syntax: 'SEQUENCE(rows, columns, start, step)',
    description: 'Returns an array of sequential numbers, such as 1, 2, 3, 4.'
  }, {
    name: 'SERIESSUM',
    syntax: 'SERIESSUM(x, n, m, a)',
    description: 'Given parameters x, n, m, and a, returns the power series sum a1xn + a2x(n+m) + .+ aix(n+(i-1)m), where i is the number of entries in range `a`.'
  }, {
    name: 'SIGN',
    syntax: 'SIGN(value)',
    description: 'Given an input number, returns `-1` if it is negative, `1` if positive, and `0` if it is zero.'
  }, {
    name: 'SIN',
    syntax: 'SIN(angle)',
    description: 'Returns the sine of an angle provided in radians.'
  }, {
    name: 'SINH',
    syntax: 'SINH(value)',
    description: 'Returns the hyperbolic sine of any real number.'
  }, {
    name: 'SQRT',
    syntax: 'SQRT(value)',
    description: 'Returns the positive square root of a positive number.'
  }, {
    name: 'SQRTPI',
    syntax: 'SQRTPI(value)',
    description: 'Returns the positive square root of the product of Pi and the given positive number.'
  }, {
    name: 'SUBTOTAL',
    syntax: 'SUBTOTAL(function_code, range1, [range2, ...])',
    description: 'Returns a subtotal for a vertical range of cells using a specified aggregation function.'
  }, {
    name: 'SUM',
    syntax: 'SUM(value1, [value2, ...])',
    description: 'Returns the sum of a series of numbers and/or cells.'
  }, {
    name: 'SUMIF',
    syntax: 'SUMIF(range, criterion, [sum_range])',
    description: 'Returns a conditional sum across a range.'
  }, {
    name: 'SUMIFS',
    syntax: 'SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    description: 'Returns the sum of a range depending on multiple criteria.'
  }, {
    name: 'SUMSQ',
    syntax: 'SUMSQ(value1, [value2, ...])',
    description: 'Returns the sum of the squares of a series of numbers and/or cells.'
  }, {
    name: 'TAN',
    syntax: 'TAN(angle)',
    description: 'Returns the tangent of an angle provided in radians.'
  }, {
    name: 'TANH',
    syntax: 'TANH(value)',
    description: 'Returns the hyperbolic tangent of any real number.'
  }, {
    name: 'TRUNC',
    syntax: 'TRUNC(value, [places])',
    description: 'Truncates a number to a certain number of significant digits by omitting less significant digits.'
  }, {
    name: 'ADD',
    syntax: 'ADD(value1, value2)',
    description: 'Returns the sum of two numbersEquivalent to the `+` operator.'
  }, {
    name: 'CONCAT',
    syntax: 'CONCAT(value1, value2)',
    description: 'Returns the concatenation of two valuesEquivalent to the `&` operator.'
  }, {
    name: 'DIVIDE',
    syntax: 'DIVIDE(dividend, divisor)',
    description: 'Returns one number divided by anotherEquivalent to the `/` operator.'
  }, {
    name: 'EQ',
    syntax: 'EQ(value1, value2)',
    description: 'Returns `TRUE` if two specified values are equal and `FALSE` otherwiseEquivalent to the `=` operator.'
  }, {
    name: 'GT',
    syntax: 'GT(value1, value2)',
    description: 'Returns `TRUE` if the first argument is strictly greater than the second, and `FALSE` otherwiseEquivalent to the `>` operator.'
  }, {
    name: 'GTE',
    syntax: 'GTE(value1, value2)',
    description: 'Returns `TRUE` if the first argument is greater than or equal to the second, and `FALSE` otherwiseEquivalent to the `>=` operator.'
  }, {
    name: 'LT',
    syntax: 'LT(value1, value2)',
    description: 'Returns `TRUE` if the first argument is strictly less than the second, and `FALSE` otherwiseEquivalent to the `<` operator.'
  }, {
    name: 'LTE',
    syntax: 'LTE(value1, value2)',
    description: 'Returns `TRUE` if the first argument is less than or equal to the second, and `FALSE` otherwiseEquivalent to the `<=` operator.'
  }, {
    name: 'MINUS',
    syntax: 'MINUS(value1, value2)',
    description: 'Returns the difference of two numbersEquivalent to the `-` operator.'
  }, {
    name: 'MULTIPLY',
    syntax: 'MULTIPLY(factor1, factor2)',
    description: 'Returns the product of two numbersEquivalent to the `*` operator.'
  }, {
    name: 'NE',
    syntax: 'NE(value1, value2)',
    description: 'Returns `TRUE` if two specified values are not equal and `FALSE` otherwiseEquivalent to the `<>` operator.'
  }, {
    name: 'POW',
    syntax: 'POW(base, exponent)',
    description: 'Returns a number raised to a power.'
  }, {
    name: 'UMINUS',
    syntax: 'UMINUS(value)',
    description: 'Returns a number with the sign reversed.'
  }, {
    name: 'UNARY_PERCENT',
    syntax: 'UNARY_PERCENT(percentage)',
    description: 'Returns a value interpreted as a percentage; that is, `UNARY_PERCENT(100)` equals `1`.'
  }, {
    name: 'UPLUS',
    syntax: 'UPLUS(value)',
    description: 'Returns a specified number, unchanged.'
  }, {
    name: 'CONVERT',
    syntax: 'CONVERT(value, start_unit, end_unit)',
    description: 'Converts a numeric value to a different unit of measure.'
  }, {
    name: 'TO_DATE',
    syntax: 'TO_DATE(value)',
    description: 'Converts a provided number to a date.'
  }, {
    name: 'TO_DOLLARS',
    syntax: 'TO_DOLLARS(value)',
    description: 'Converts a provided number to a dollar value.'
  }, {
    name: 'TO_PERCENT',
    syntax: 'TO_PERCENT(value)',
    description: 'Converts a provided number to a percentage.'
  }, {
    name: 'TO_PURE_NUMBER',
    syntax: 'TO_PURE_NUMBER(value)',
    description: 'Converts a provided date/time, percentage, currency or other formatted numeric value to a pure number without formatting.'
  }, {
    name: 'TO_TEXT',
    syntax: 'TO_TEXT(value)',
    description: 'Converts a provided numeric value to a text value.'
  }, {
    name: 'AVEDEV',
    syntax: 'AVEDEV(value1, [value2, ...])',
    description: 'Calculates the average of the magnitudes of deviations of data from a dataset\'s mean.'
  }, {
    name: 'AVERAGE',
    syntax: 'AVERAGE(value1, [value2, ...])',
    description: 'Returns the numerical average value in a dataset, ignoring text.'
  }, {
    name: 'AVERAGE.WEIGHTED',
    syntax: 'AVERAGE.WEIGHTED(values, weights, [additional values], [additional weights])',
    description: 'Finds the weighted average of a set of values, given the values and the corresponding weights.'
  }, {
    name: 'AVERAGEA',
    syntax: 'AVERAGEA(value1, [value2, ...])',
    description: 'Returns the numerical average value in a dataset.'
  }, {
    name: 'AVERAGEIF',
    syntax: 'AVERAGEIF(criteria_range, criterion, [average_range])',
    description: 'Returns the average of a range depending on criteria.'
  }, {
    name: 'AVERAGEIFS',
    syntax: 'AVERAGEIFS(average_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    description: 'Returns the average of a range depending on multiple criteria.'
  }, {
    name: 'BETA.DIST',
    syntax: 'BETA.DIST(value, alpha, beta, cumulative, lower_bound, upper_bound)',
    description: 'Returns the probability of a given value as defined by the beta distribution function.'
  }, {
    name: 'BETA.INV',
    syntax: 'BETA.INV(probability, alpha, beta, lower_bound, upper_bound)',
    description: 'Returns the value of the inverse beta distribution function for a given probability.'
  }, {
    name: 'BETADIST',
    syntax: 'BETADIST(value, alpha, beta, lower_bound, upper_bound)',
    description: 'SeeBETA.DIST.'
  }, {
    name: 'BETAINV',
    syntax: 'BETAINV(probability, alpha, beta, lower_bound, upper_bound)',
    description: 'SeeBETA.INV'
  }, {
    name: 'BINOM.DIST',
    syntax: 'BINOM.DIST(num_successes, num_trials, prob_success, cumulative)',
    description: 'See BINOMDIST '
  }, {
    name: 'BINOM.INV',
    syntax: 'BINOM.INV(num_trials, prob_success, target_prob)',
    description: 'See CRITBINOM'
  }, {
    name: 'BINOMDIST',
    syntax: 'BINOMDIST(num_successes, num_trials, prob_success, cumulative)',
    description: 'Calculates the probability of drawing a certain number of successes (or a maximum number of successes) in a certain number of tries given a population of a certain size containing a certain number of successes, with replacement of draws.'
  }, {
    name: 'CHIDIST',
    syntax: 'CHIDIST(x, degrees_freedom)',
    description: 'Calculates the right-tailed chi-squared distribution, often used in hypothesis testing.'
  }, {
    name: 'CHIINV',
    syntax: 'CHIINV(probability, degrees_freedom)',
    description: 'Calculates the inverse of the right-tailed chi-squared distribution.'
  }, {
    name: 'CHISQ.DIST',
    syntax: 'CHISQ.DIST(x, degrees_freedom, cumulative)',
    description: 'Calculates the left-tailed chi-squared distribution, often used in hypothesis testing.'
  }, {
    name: 'CHISQ.DIST.RT',
    syntax: 'CHISQ.DIST.RT(x, degrees_freedom)',
    description: 'Calculates the right-tailed chi-squared distribution, which is commonly used in hypothesis testing.'
  }, {
    name: 'CHISQ.INV',
    syntax: 'CHISQ.INV(probability, degrees_freedom)',
    description: 'Calculates the inverse of the left-tailed chi-squared distribution.'
  }, {
    name: 'CHISQ.INV.RT',
    syntax: 'CHISQ.INV.RT(probability, degrees_freedom)',
    description: 'Calculates the inverse of the right-tailed chi-squared distribution.'
  }, {
    name: 'CHISQ.TEST',
    syntax: 'CHISQ.TEST(observed_range, expected_range)',
    description: 'See CHITEST'
  }, {
    name: 'CHITEST',
    syntax: 'CHITEST(observed_range, expected_range)',
    description: 'Returns the probability associated with a Pearson’s chi-squared test on the two ranges of dataDetermines the likelihood that the observed categorical data is drawn from an expected distribution.'
  }, {
    name: 'CONFIDENCE',
    syntax: 'CONFIDENCE(alpha, standard_deviation, pop_size)',
    description: 'See CONFIDENCE.NORM'
  }, {
    name: 'CONFIDENCE.NORM',
    syntax: 'CONFIDENCE.NORM(alpha, standard_deviation, pop_size)',
    description: 'Calculates the width of half the confidence interval for a normal distribution.'
  }, {
    name: 'CONFIDENCE.T',
    syntax: 'CONFIDENCE.T(alpha, standard_deviation, size)',
    description: 'Calculates the width of half the confidence interval for a Student’s t-distribution.'
  }, {
    name: 'CORREL',
    syntax: 'CORREL(data_y, data_x)',
    description: 'Calculates r, the Pearson product-moment correlation coefficient of a dataset.'
  }, {
    name: 'COUNT',
    syntax: 'COUNT(value1, [value2, ...])',
    description: 'Returns a count of the number of numeric values in a dataset.'
  }, {
    name: 'COUNTA',
    syntax: 'COUNTA(value1, [value2, ...])',
    description: 'Returns a count of the number of values in a dataset.'
  }, {
    name: 'COVAR',
    syntax: 'COVAR(data_y, data_x)',
    description: 'Calculates the covariance of a dataset.'
  }, {
    name: 'COVARIANCE.P',
    syntax: 'COVARIANCE.P(data_y, data_x)',
    description: 'See COVAR'
  }, {
    name: 'COVARIANCE.S',
    syntax: 'COVARIANCE.S(data_y, data_x)',
    description: 'Calculates the covariance of a dataset, where the dataset is a sample of the total population.'
  }, {
    name: 'CRITBINOM',
    syntax: 'CRITBINOM(num_trials, prob_success, target_prob)',
    description: 'Calculates the smallest value for which the cumulative binomial distribution is greater than or equal to a specified criteria.'
  }, {
    name: 'DEVSQ',
    syntax: 'DEVSQ(value1, value2)',
    description: 'Calculates the sum of squares of deviations based on a sample.'
  }, {
    name: 'EXPON.DIST',
    syntax: 'EXPON.DIST(x, lambda, cumulative)',
    description: 'Returns the value of the exponential distribution function with a specified lambda at a specified value.'
  }, {
    name: 'EXPONDIST',
    syntax: 'EXPONDIST(x, lambda, cumulative)',
    description: 'SeeEXPON.DIST'
  }, {
    name: 'F.DIST',
    syntax: 'F.DIST(x, degrees_freedom1, degrees_freedom2, cumulative)',
    description: 'Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input xAlternately called Fisher-Snedecor distribution or Snedecor\'s F distribution.'
  }, {
    name: 'F.DIST.RT',
    syntax: 'F.DIST.RT(x, degrees_freedom1, degrees_freedom2)',
    description: 'Calculates the right-tailed F probability distribution (degree of diversity) for two data sets with given input xAlternately called Fisher-Snedecor distribution or Snedecor\'s F distribution.'
  }, {
    name: 'F.INV',
    syntax: 'F.INV(probability, degrees_freedom1, degrees_freedom2)',
    description: 'Calculates the inverse of the left-tailed F probability distributionAlso called the Fisher-Snedecor distribution or Snedecor’s F distribution.'
  }, {
    name: 'F.INV.RT',
    syntax: 'F.INV.RT(probability, degrees_freedom1, degrees_freedom2)',
    description: 'Calculates the inverse of the right-tailed F probability distributionAlso called the Fisher-Snedecor distribution or Snedecor’s F distribution.'
  }, { name: 'F.TEST', syntax: 'F.TEST(range1, range2)', description: 'See FTEST.' }, {
    name: 'FDIST',
    syntax: 'FDIST(x, degrees_freedom1, degrees_freedom2)',
    description: 'SeeF.DIST.RT.'
  }, {
    name: 'FINV',
    syntax: 'FINV(probability, degrees_freedom1, degrees_freedom2)',
    description: 'See F.INV.RT'
  }, {
    name: 'FISHER',
    syntax: 'FISHER(value)',
    description: 'Returns the Fisher transformation of a specified value.'
  }, {
    name: 'FISHERINV',
    syntax: 'FISHERINV(value)',
    description: 'Returns the inverse Fisher transformation of a specified value.'
  }, {
    name: 'FORECAST',
    syntax: 'FORECAST(x, data_y, data_x)',
    description: 'Calculates the expected y-value for a specified x based on a linear regression of a dataset.'
  }, {
    name: 'FORECAST.LINEAR',
    syntax: 'FORECAST.LINEAR(x, data_y, data_x)',
    description: 'See FORECAST '
  }, {
    name: 'FTEST',
    syntax: 'FTEST(range1, range2)',
    description: 'Returns the probability associated with an F-test for equality of variancesDetermines whether two samples are likely to have come from populations with the same variance.'
  }, {
    name: 'GAMMA',
    syntax: 'GAMMA(number)',
    description: 'Returns the Gamma function evaluated at the specified value.'
  }, {
    name: 'GAMMA.DIST',
    syntax: 'GAMMA.DIST(x, alpha, beta, cumulative)',
    description: 'Calculates the gamma distribution, a two-parameter continuous probability distribution.'
  }, {
    name: 'GAMMA.INV',
    syntax: 'GAMMA.INV(probability, alpha, beta)',
    description: 'The GAMMA.INV function returns the value of the inverse gamma cumulative distribution function for the specified probability and alpha and beta parameters.'
  }, {
    name: 'GAMMADIST',
    syntax: 'GAMMADIST(x, alpha, beta, cumulative)',
    description: 'SeeGAMMA.DIST'
  }, {
    name: 'GAMMAINV',
    syntax: 'GAMMAINV(probability, alpha, beta)',
    description: 'SeeGAMMA.INV.'
  }, {
    name: 'GAUSS',
    syntax: 'GAUSS(z)',
    description: 'The GAUSS function returns the probability that a random variable, drawn from a normal distribution, will be between the mean and z standard deviations above (or below) the mean.'
  }, {
    name: 'GEOMEAN',
    syntax: 'GEOMEAN(value1, value2)',
    description: 'Calculates the geometric mean of a dataset.'
  }, {
    name: 'HARMEAN',
    syntax: 'HARMEAN(value1, value2)',
    description: 'Calculates the harmonic mean of a dataset.'
  }, {
    name: 'HYPGEOM.DIST',
    syntax: 'HYPGEOM.DIST(num_successes, num_draws, successes_in_pop, pop_size)',
    description: 'See HYPGEOMDIST '
  }, {
    name: 'HYPGEOMDIST',
    syntax: 'HYPGEOMDIST(num_successes, num_draws, successes_in_pop, pop_size)',
    description: 'Calculates the probability of drawing a certain number of successes in a certain number of tries given a population of a certain size containing a certain number of successes, without replacement of draws.'
  }, {
    name: 'INTERCEPT',
    syntax: 'INTERCEPT(data_y, data_x)',
    description: 'Calculates the y-value at which the line resulting from linear regression of a dataset will intersect the y-axis (x=0).'
  }, {
    name: 'KURT',
    syntax: 'KURT(value1, value2)',
    description: 'Calculates the kurtosis of a dataset, which describes the shape, and in particular the "peakedness" of that dataset.'
  }, {
    name: 'LARGE',
    syntax: 'LARGE(data, n)',
    description: 'Returns the nth largest element from a data set, where n is user-defined.'
  }, {
    name: 'LOGINV',
    syntax: 'LOGINV(x, mean, standard_deviation)',
    description: 'Returns the value of the inverse log-normal cumulative distribution with given mean and standard deviation at a specified value.'
  }, {
    name: 'LOGNORM.DIST',
    syntax: 'LOGNORM.DIST(x, mean, standard_deviation)',
    description: 'See LOGNORMDIST'
  }, {
    name: 'LOGNORM.INV',
    syntax: 'LOGNORM.INV(x, mean, standard_deviation)',
    description: 'See LOGINV'
  }, {
    name: 'LOGNORMDIST',
    syntax: 'LOGNORMDIST(x, mean, standard_deviation)',
    description: 'Returns the value of the log-normal cumulative distribution with given mean and standard deviation at a specified value.'
  }, {
    name: 'MAX',
    syntax: 'MAX(value1, [value2, ...])',
    description: 'Returns the maximum value in a numeric dataset.'
  }, {
    name: 'MAXA',
    syntax: 'MAXA(value1, value2)',
    description: 'Returns the maximum numeric value in a dataset.'
  }, {
    name: 'MAXIFS',
    syntax: 'MAXIFS(range, criteria_range1, criterion1, [criteria_range2, criterion2], …)',
    description: 'Returns the maximum value in a range of cells, filtered by a set of criteria'
  }, {
    name: 'MEDIAN',
    syntax: 'MEDIAN(value1, [value2, ...])',
    description: 'Returns the median value in a numeric dataset.'
  }, {
    name: 'MIN',
    syntax: 'MIN(value1, [value2, ...])',
    description: 'Returns the minimum value in a numeric dataset.'
  }, {
    name: 'MINA',
    syntax: 'MINA(value1, value2)',
    description: 'Returns the minimum numeric value in a dataset.'
  }, {
    name: 'MINIFS',
    syntax: 'MINIFS(range, criteria_range1, criterion1, [criteria_range2, criterion2], …)',
    description: 'Returns the minimum value in a range of cells, filtered by a set of criteria'
  }, {
    name: 'MODE',
    syntax: 'MODE(value1, [value2, ...])',
    description: 'Returns the most commonly occurring value in a dataset.'
  }, {
    name: 'MODE.MULT',
    syntax: 'MODE.MULT(value1, value2)',
    description: 'Returns the most commonly occurring values in a dataset.'
  }, {
    name: 'MODE.SNGL',
    syntax: 'MODE.SNGL(value1, [value2, ...])',
    description: 'See MODE'
  }, {
    name: 'NEGBINOM.DIST',
    syntax: 'NEGBINOM.DIST(num_failures, num_successes, prob_success)',
    description: 'See NEGBINOMDIST '
  }, {
    name: 'NEGBINOMDIST',
    syntax: 'NEGBINOMDIST(num_failures, num_successes, prob_success)',
    description: 'Calculates the probability of drawing a certain number of failures before a certain number of successes given a probability of success in independent trials.'
  }, {
    name: 'NORM.DIST',
    syntax: 'NORM.DIST(x, mean, standard_deviation, cumulative)',
    description: 'See NORMDIST '
  }, {
    name: 'NORM.INV',
    syntax: 'NORM.INV(x, mean, standard_deviation)',
    description: 'See NORMINV '
  }, {
    name: 'NORM.S.DIST',
    syntax: 'NORM.S.DIST(x)',
    description: 'See NORMSDIST'
  }, { name: 'NORM.S.INV', syntax: 'NORM.S.INV(x)', description: 'See NORMSINV' }, {
    name: 'NORMDIST',
    syntax: 'NORMDIST(x, mean, standard_deviation, cumulative)',
    description: 'Returns the value of the normal distribution function (or normal cumulative distribution function) for a specified value, mean, and standard deviation.'
  }, {
    name: 'NORMINV',
    syntax: 'NORMINV(x, mean, standard_deviation)',
    description: 'Returns the value of the inverse normal distribution function for a specified value, mean, and standard deviation.'
  }, {
    name: 'NORMSDIST',
    syntax: 'NORMSDIST(x)',
    description: 'Returns the value of the standard normal cumulative distribution function for a specified value.'
  }, {
    name: 'NORMSINV',
    syntax: 'NORMSINV(x)',
    description: 'Returns the value of the inverse standard normal distribution function for a specified value.'
  }, {
    name: 'PEARSON',
    syntax: 'PEARSON(data_y, data_x)',
    description: 'Calculates r, the Pearson product-moment correlation coefficient of a dataset.'
  }, {
    name: 'PERCENTILE',
    syntax: 'PERCENTILE(data, percentile)',
    description: 'Returns the value at a given percentile of a dataset.'
  }, {
    name: 'PERCENTILE.EXC',
    syntax: 'PERCENTILE.EXC(data, percentile)',
    description: 'Returns the value at a given percentile of a dataset, exclusive of 0 and 1.'
  }, {
    name: 'PERCENTILE.INC',
    syntax: 'PERCENTILE.INC(data, percentile)',
    description: 'See PERCENTILE'
  }, {
    name: 'PERCENTRANK',
    syntax: 'PERCENTRANK(data, value, [significant_digits])',
    description: 'Returns the percentage rank (percentile) of a specified value in a dataset.'
  }, {
    name: 'PERCENTRANK.EXC',
    syntax: 'PERCENTRANK.EXC(data, value, [significant_digits])',
    description: 'Returns the percentage rank (percentile) from 0 to 1 exclusive of a specified value in a dataset.'
  }, {
    name: 'PERCENTRANK.INC',
    syntax: 'PERCENTRANK.INC(data, value, [significant_digits])',
    description: 'Returns the percentage rank (percentile) from 0 to 1 inclusive of a specified value in a dataset.'
  }, {
    name: 'PERMUTATIONA',
    syntax: 'PERMUTATIONA(number, number_chosen)',
    description: 'Returns the number of permutations for selecting a group of objects (with replacement) from a total number of objects.'
  }, {
    name: 'PERMUT',
    syntax: 'PERMUT(n, k)',
    description: 'Returns the number of ways to choose some number of objects from a pool of a given size of objects, considering order.'
  }, {
    name: 'PHI',
    syntax: 'PHI(x)',
    description: 'The PHI function returns the value of the normal distribution with mean 0 and standard deviation 1.'
  }, {
    name: 'POISSON',
    syntax: 'POISSON(x, mean, cumulative)',
    description: 'SeePOISSON.DIST'
  }, {
    name: 'POISSON.DIST',
    syntax: 'POISSON.DIST(x, mean, [cumulative])',
    description: 'Returns the value of the Poisson distribution function (or Poisson cumulative distribution function) for a specified value and mean.'
  }, {
    name: 'PROB',
    syntax: 'PROB(data, probabilities, low_limit, [high_limit])',
    description: 'Given a set of values and corresponding probabilities, calculates the probability that a value chosen at random falls between two limits.'
  }, {
    name: 'QUARTILE',
    syntax: 'QUARTILE(data, quartile_number)',
    description: 'Returns a value nearest to a specified quartile of a dataset.'
  }, {
    name: 'QUARTILE.EXC',
    syntax: 'QUARTILE.EXC(data, quartile_number)',
    description: 'Returns value nearest to a given quartile of a dataset, exclusive of 0 and 4.'
  }, {
    name: 'QUARTILE.INC',
    syntax: 'QUARTILE.INC(data, quartile_number)',
    description: 'See QUARTILE'
  }, {
    name: 'RANK',
    syntax: 'RANK(value, data, [is_ascending])',
    description: 'Returns the rank of a specified value in a dataset.'
  }, {
    name: 'RANK.AVG',
    syntax: 'RANK.AVG(value, data, [is_ascending])',
    description: 'Returns the rank of a specified value in a datasetIf there is more than one entry of the same value in the dataset, the average rank of the entries will be returned.'
  }, {
    name: 'RANK.EQ',
    syntax: 'RANK.EQ(value, data, [is_ascending])',
    description: 'Returns the rank of a specified value in a datasetIf there is more than one entry of the same value in the dataset, the top rank of the entries will be returned.'
  }, {
    name: 'RSQ',
    syntax: 'RSQ(data_y, data_x)',
    description: 'Calculates the square of r, the Pearson product-moment correlation coefficient of a dataset.'
  }, {
    name: 'SKEW',
    syntax: 'SKEW(value1, value2)',
    description: 'Calculates the skewness of a dataset, which describes the symmetry of that dataset about the mean.'
  }, {
    name: 'SKEW.P',
    syntax: 'SKEW.P(value1, value2)',
    description: 'Calculates the skewness of a dataset that represents the entire population.'
  }, {
    name: 'SLOPE',
    syntax: 'SLOPE(data_y, data_x)',
    description: 'Calculates the slope of the line resulting from linear regression of a dataset.'
  }, {
    name: 'SMALL',
    syntax: 'SMALL(data, n)',
    description: 'Returns the nth smallest element from a data set, where n is user-defined.'
  }, {
    name: 'STANDARDIZE',
    syntax: 'STANDARDIZE(value, mean, standard_deviation)',
    description: 'Calculates the normalized equivalent of a random variable given mean and standard deviation of the distribution.'
  }, {
    name: 'STDEV',
    syntax: 'STDEV(value1, [value2, ...])',
    description: 'Calculates the standard deviation based on a sample.'
  }, {
    name: 'STDEV.P',
    syntax: 'STDEV.P(value1, [value2, ...])',
    description: 'See STDEVP'
  }, {
    name: 'STDEV.S',
    syntax: 'STDEV.S(value1, [value2, ...])',
    description: 'See STDEV'
  }, {
    name: 'STDEVA',
    syntax: 'STDEVA(value1, value2)',
    description: 'Calculates the standard deviation based on a sample, setting text to the value `0`.'
  }, {
    name: 'STDEVP',
    syntax: 'STDEVP(value1, value2)',
    description: 'Calculates the standard deviation based on an entire population.'
  }, {
    name: 'STDEVPA',
    syntax: 'STDEVPA(value1, value2)',
    description: 'Calculates the standard deviation based on an entire population, setting text to the value `0`.'
  }, {
    name: 'STEYX',
    syntax: 'STEYX(data_y, data_x)',
    description: 'Calculates the standard error of the predicted y-value for each x in the regression of a dataset.'
  }, {
    name: 'T.DIST',
    syntax: 'T.DIST(x, degrees_freedom, cumulative)',
    description: 'Returns the right tailed Student distribution for a value x.'
  }, {
    name: 'T.DIST.2T',
    syntax: 'T.DIST.2T(x, degrees_freedom)',
    description: 'Returns the two tailed Student distribution for a value x.'
  }, {
    name: 'T.DIST.RT',
    syntax: 'T.DIST.RT(x, degrees_freedom)',
    description: 'Returns the right tailed Student distribution for a value x.'
  }, {
    name: 'T.INV',
    syntax: 'T.INV(probability, degrees_freedom)',
    description: 'Calculates the negative inverse of the one-tailed TDIST function.'
  }, {
    name: 'T.INV.2T',
    syntax: 'T.INV.2T(probability, degrees_freedom)',
    description: 'Calculates the inverse of the two-tailed TDIST function.'
  }, {
    name: 'T.TEST',
    syntax: 'T.TEST(range1, range2, tails, type)',
    description: 'Returns the probability associated with Student\'s t-testDetermines whether two samples are likely to have come from the same two underlying populations that have the same mean.'
  }, {
    name: 'TDIST',
    syntax: 'TDIST(x, degrees_freedom, tails)',
    description: 'Calculates the probability for Student\'s t-distribution with a given input (x).'
  }, {
    name: 'TINV',
    syntax: 'TINV(probability, degrees_freedom)',
    description: 'See T.INV.2T'
  }, {
    name: 'TRIMMEAN',
    syntax: 'TRIMMEAN(data, exclude_proportion)',
    description: 'Calculates the mean of a dataset excluding some proportion of data from the high and low ends of the dataset.'
  }, {
    name: 'TTEST',
    syntax: 'TTEST(range1, range2, tails, type)',
    description: 'SeeT.TEST.'
  }, {
    name: 'VAR',
    syntax: 'VAR(value1, [value2, ...])',
    description: 'Calculates the variance based on a sample.'
  }, {
    name: 'VAR.P', syntax: 'VAR.P(value1, [value2, ...])', description: 'See VARP'
  }, {
    name: 'VAR.S', syntax: 'VAR.S(value1, [value2, ...])', description: 'See VAR'
  }, {
    name: 'VARA',
    syntax: 'VARA(value1, value2)',
    description: 'Calculates an estimate of variance based on a sample, setting text to the value `0`.'
  }, {
    name: 'VARP',
    syntax: 'VARP(value1, value2)',
    description: 'Calculates the variance based on an entire population.'
  }, {
    name: 'VARPA',
    syntax: 'VARPA(value1, value2,...)',
    description: 'Calculates the variance based on an entire population, setting text to the value `0`.'
  }, {
    name: 'WEIBULL',
    syntax: 'WEIBULL(x, shape, scale, cumulative)',
    description: 'Returns the value of the Weibull distribution function (or Weibull cumulative distribution function) for a specified shape and scale.'
  }, {
    name: 'WEIBULL.DIST',
    syntax: 'WEIBULL.DIST(x, shape, scale, cumulative)',
    description: 'See WEIBULL'
  }, {
    name: 'Z.TEST',
    syntax: 'Z.TEST(data, value, [standard_deviation])',
    description: 'Returns the one-tailed P-value of a Z-test with standard distribution.'
  }, {
    name: 'ZTEST',
    syntax: 'ZTEST(data, value, [standard_deviation])',
    description: 'SeeZ.TEST.'
  }, {
    name: 'ARABIC',
    syntax: 'ARABIC(roman_numeral)',
    description: 'Computes the value of a Roman numeral.'
  }, {
    name: 'ASC',
    syntax: 'ASC(text)',
    description: 'Converts full-width ASCII and katakana characters to their half-width counterpartsAll standard-width characters will remain unchanged.'
  }, {
    name: 'CHAR',
    syntax: 'CHAR(table_number)',
    description: 'Convert a number into a character according to the current Unicode table.'
  }, {
    name: 'CLEAN',
    syntax: 'CLEAN(text)',
    description: 'Returns the text with the non-printable ASCII characters removed.'
  }, {
    name: 'CODE',
    syntax: 'CODE(string)',
    description: 'Returns the numeric Unicode map value of the first character in the string provided.'
  }, {
    name: 'CONCATENATE',
    syntax: 'CONCATENATE(string1, [string2, ...])',
    description: 'Appends strings to one another.'
  }, {
    name: 'DOLLAR',
    syntax: 'DOLLAR(number, [number_of_places])',
    description: 'Formats a number into the locale-specific currency format.'
  }, {
    name: 'EXACT',
    syntax: 'EXACT(string1, string2)',
    description: 'Tests whether two strings are identical.'
  }, {
    name: 'FIND',
    syntax: 'FIND(search_for, text_to_search, [starting_at])',
    description: 'Returns the position at which a string is first found within text.'
  }, {
    name: 'FINDB',
    syntax: 'FINDB(search_for, text_to_search, [starting_at])',
    description: 'Returns the position at which a string is first found within text counting each double-character as 2.'
  }, {
    name: 'FIXED',
    syntax: 'FIXED(number, [number_of_places], [suppress_separator])',
    description: 'Formats a number with a fixed number of decimal places.'
  }, {
    name: 'JOIN',
    syntax: 'JOIN(delimiter, value_or_array1, [value_or_array2, ...])',
    description: 'Concatenates the elements of one or more one-dimensional arrays using a specified delimiter.'
  }, {
    name: 'LEFT',
    syntax: 'LEFT(string, [number_of_characters])',
    description: 'Returns a substring from the beginning of a specified string.'
  }, {
    name: 'LEFTB',
    syntax: 'LEFTB(string, num_of_bytes)',
    description: 'Returns the left portion of a string up to a certain number of bytes.'
  }, {
    name: 'LEN',
    syntax: 'LEN(text)',
    description: 'Returns the length of a string.'
  }, {
    name: 'LENB',
    syntax: 'LENB(string)',
    description: 'Returns the length of a string in bytes.".'
  }, {
    name: 'LOWER',
    syntax: 'LOWER(text)',
    description: 'Converts a specified string to lowercase.'
  }, {
    name: 'MID',
    syntax: 'MID(string, starting_at, extract_length)',
    description: 'Returns a segment of a string.'
  }, {
    name: 'MIDB',
    syntax: 'MIDB(string)',
    description: 'Returns a section of a string starting at a given character and up to a specified number of bytes.'
  }, {
    name: 'PROPER',
    syntax: 'PROPER(text_to_capitalize)',
    description: 'Capitalizes each word in a specified string.'
  }, {
    name: 'REGEXEXTRACT',
    syntax: 'REGEXEXTRACT(text, regular_expression)',
    description: 'Extracts matching substrings according to a regular expression.'
  }, {
    name: 'REGEXMATCH',
    syntax: 'REGEXMATCH(text, regular_expression)',
    description: 'Whether a piece of text matches a regular expression.'
  }, {
    name: 'REGEXREPLACE',
    syntax: 'REGEXREPLACE(text, regular_expression, replacement)',
    description: 'Replaces part of a text string with a different text string using regular expressions.'
  }, {
    name: 'REPLACE',
    syntax: 'REPLACE(text, position, length, new_text)',
    description: 'Replaces part of a text string with a different text string.'
  }, {
    name: 'REPLACEB',
    syntax: 'REPLACEB(text, position, num_bytes, new_text)',
    description: 'Replaces part of a text string, based on a number of bytes, with a different text string.'
  }, {
    name: 'REPT',
    syntax: 'REPT(text_to_repeat, number_of_repetitions)',
    description: 'Returns specified text repeated a number of times.'
  }, {
    name: 'RIGHT',
    syntax: 'RIGHT(string, [number_of_characters])',
    description: 'Returns a substring from the end of a specified string.'
  }, {
    name: 'RIGHTB',
    syntax: 'RIGHTB(string, num_of_bytes)',
    description: 'Returns the right portion of a string up to a certain number of bytes.'
  }, {
    name: 'ROMAN',
    syntax: 'ROMAN(number, [rule_relaxation])',
    description: 'Formats a number in Roman numerals.'
  }, {
    name: 'SEARCH',
    syntax: 'SEARCH(search_for, text_to_search, [starting_at])',
    description: 'Returns the position at which a string is first found within text.'
  }, {
    name: 'SEARCHB',
    syntax: 'SEARCHB(search_for, text_to_search, [starting_at])',
    description: 'Returns the position at which a string is first found within text counting each double-character as 2.'
  }, {
    name: 'SPLIT',
    syntax: 'SPLIT(text, delimiter, [split_by_each], [remove_empty_text])',
    description: 'Divides text around a specified character or string, and puts each fragment into a separate cell in the row.'
  }, {
    name: 'SUBSTITUTE',
    syntax: 'SUBSTITUTE(text_to_search, search_for, replace_with, [occurrence_number])',
    description: 'Replaces existing text with new text in a string.'
  }, {
    name: 'T',
    syntax: 'T(value)',
    description: 'Returns string arguments as text.'
  }, {
    name: 'TEXT',
    syntax: 'TEXT(number, format)',
    description: 'Converts a number into text according to a specified format.'
  }, {
    name: 'TEXTJOIN',
    syntax: 'TEXTJOIN(delimiter, ignore_empty, text1, [text2], …)',
    description: 'Combines the text from multiple strings and/or arrays, with a specifiable delimiter separating the different texts'
  }, {
    name: 'TRIM',
    syntax: 'TRIM(text)',
    description: 'Removes leading and trailing spaces in a specified string.'
  }, {
    name: 'UNICHAR',
    syntax: 'UNICHAR(number)',
    description: 'Returns the Unicode character for a number.'
  }, {
    name: 'UNICODE',
    syntax: 'UNICODE(text)',
    description: 'Returns the decimal Unicode value of the first character of the text.'
  }, {
    name: 'UPPER',
    syntax: 'UPPER(text)',
    description: 'Converts a specified string to uppercase.'
  }, {
    name: 'VALUE',
    syntax: 'VALUE(text)',
    description: 'Converts a string in any of the date, time or number formats that Google Sheets understands into a number.'
  }, {
    name: 'ENCODEURL',
    syntax: 'ENCODEURL(text)',
    description: 'Encodes a string of text for the purpose of using in a URL query.'
  }, {
    name: 'HYPERLINK',
    syntax: 'HYPERLINK(url, [link_label])',
    description: 'Creates a hyperlink inside a cell.'
  }, {
    name: 'IMPORTDATA',
    syntax: 'IMPORTDATA(url)',
    description: 'Imports data at a given url in .csv (comma-separated value) or .tsv (tab-separated value) format.'
  }, {
    name: 'IMPORTFEED',
    syntax: 'IMPORTFEED(url, [query], [headers], [num_items])',
    description: 'Imports a RSS or ATOM feed.'
  }, {
    name: 'IMPORTHTML',
    syntax: 'IMPORTHTML(url, query, index)',
    description: 'Imports data from a table or list within an HTML page.'
  }, {
    name: 'IMPORTRANGE',
    syntax: 'IMPORTRANGE(spreadsheet_url, range_string)',
    description: 'Imports a range of cells from a specified spreadsheet.'
  }, {
    name: 'IMPORTXML',
    syntax: 'IMPORTXML(url, xpath_query)',
    description: 'Imports data from any of various structured data types including XML, HTML, CSV, TSV, and RSS and ATOM XML feeds.'
  }, {
    name: 'ISURL',
    syntax: 'ISURL(value)',
    description: 'Checks whether a value is a valid URL.'
  }
];
