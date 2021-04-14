import { Formula } from '../../interfaces/formula';

export const editorFormulas: Formula[] = [
  {
    label: 'ARRAY_CONSTRAIN',
    syntaxParameter: [1, 1, 1],
    syntax: 'ARRAY_CONSTRAIN(input_range, num_rows, num_cols)',
    description: 'Constrains an array result to a specified size.'
  }, {
    label: 'FLATTEN',
    syntaxParameter: [1, 1000],
    syntax: 'FLATTEN(range1,[range2,...])',
    description: 'See FLATTEN.'
  }, {
    label: 'FREQUENCY',
    syntaxParameter: [1, 1],
    syntax: 'FREQUENCY(data, classes)',
    description: 'Calculates the frequency distribution of a one-column array into specified classes.'
  }, {
    label: 'GROWTH',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'GROWTH(known_data_y, [known_data_x], [new_data_x], [b])',
    description: 'Given partial data about an exponential growth trend, fits an ideal exponential growth trend and/or predicts further values.'
  }, {
    label: 'LINEST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'LINEST(known_data_y, [known_data_x], [calculate_b], [verbose])',
    description: 'Given partial data about a linear trend, calculates various parameters about the ideal linear trend using the least-squares method.'
  }, {
    label: 'LOGEST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'LOGEST(known_data_y, [known_data_x], [b], [verbose])',
    description: 'Given partial data about an exponential growth curve, calculates various parameters about the best fit ideal exponential growth curve.'
  }, {
    label: 'MDETERM',
    syntaxParameter: [1],
    syntax: 'MDETERM(square_matrix)',
    description: 'Returns the matrix determinant of a square matrix specified as an array or range.'
  }, {
    label: 'MINVERSE',
    syntaxParameter: [1],
    syntax: 'MINVERSE(square_matrix)',
    description: 'Returns the multiplicative inverse of a square matrix specified as an array or range.'
  }, {
    label: 'MMULT',
    syntaxParameter: [1],
    syntax: 'MMULT(matrix1, matrix2)',
    description: 'Calculates the matrix product of two matrices specified as arrays or ranges.'
  }, {
    label: 'SUMPRODUCT',
    syntaxParameter: [1, 1000],
    syntax: 'SUMPRODUCT(array1, [array2, ...])',
    description: 'Calculates the sum of the products of corresponding entries in two equal-sized arrays or ranges.'
  }, {
    label: 'SUMX2MY2',
    syntaxParameter: [1, 1],
    syntax: 'SUMX2MY2(array_x, array_y)',
    description: 'Calculates the sum of the differences of the squares of values in two arrays.'
  }, {
    label: 'SUMX2PY2',
    syntaxParameter: [1, 1],
    syntax: 'SUMX2PY2(array_x, array_y)',
    description: 'Calculates the sum of the sums of the squares of values in two arrays.'
  }, {
    label: 'SUMXMY2',
    syntaxParameter: [1, 1],
    syntax: 'SUMXMY2(array_x, array_y)',
    description: 'Calculates the sum of the squares of differences of values in two arrays.'
  }, {
    label: 'TRANSPOSE',
    syntaxParameter: [1],
    syntax: 'TRANSPOSE(array_or_range)',
    description: 'Transposes the rows and columns of an array or range of cells.'
  }, {
    label: 'TREND',
    syntaxParameter: [1, 0, 0, 0],
    syntax: 'TREND(known_data_y, [known_data_x], [new_data_x], [b])',
    description: 'Given partial data about a linear trend, fits an ideal linear trend using the least squares method and/or predicts further values.'
  }, {
    label: 'DAVERAGE',
    syntaxParameter: [1, 1, 1],
    syntax: 'DAVERAGE(database, field, criteria)',
    description: 'Returns the average of a set of values selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DCOUNT',
    syntaxParameter: [1, 1, 1],
    syntax: 'DCOUNT(database, field, criteria)',
    description: 'Counts numeric values selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DCOUNTA',
    syntaxParameter: [1, 1, 1],
    syntax: 'DCOUNTA(database, field, criteria)',
    description: 'Counts values, including text, selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DGET',
    syntaxParameter: [1, 1, 1],
    syntax: 'DGET(database, field, criteria)',
    description: 'Returns a single value from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DMAX',
    syntaxParameter: [1, 1, 1],
    syntax: 'DMAX(database, field, criteria)',
    description: 'Returns the maximum value selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DMIN',
    syntaxParameter: [1, 1, 1],
    syntax: 'DMIN(database, field, criteria)',
    description: 'Returns the minimum value selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DPRODUCT',
    syntaxParameter: [1, 1, 1],
    syntax: 'DPRODUCT(database, field, criteria)',
    description: 'Returns the product of values selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DSTDEV',
    syntaxParameter: [1, 1, 1],
    syntax: 'DSTDEV(database, field, criteria)',
    description: 'Returns the standard deviation of a population sample selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DSTDEVP',
    syntaxParameter: [1, 1, 1],
    syntax: 'DSTDEVP(database, field, criteria)',
    description: 'Returns the standard deviation of an entire population selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DSUM',
    syntaxParameter: [1, 1, 1],
    syntax: 'DSUM(database, field, criteria)',
    description: 'Returns the sum of values selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DVAR',
    syntaxParameter: [1, 1, 1],
    syntax: 'DVAR(database, field, criteria)',
    description: 'Returns the variance of a population sample selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DVARP',
    syntaxParameter: [1, 1, 1],
    syntax: 'DVARP(database, field, criteria)',
    description: 'Returns the variance of an entire population selected from a database table-like array or range using a SQL-like query.'
  }, {
    label: 'DATE',
    syntaxParameter: [1, 1, 1],
    syntax: 'DATE(year, month, day)',
    description: 'Converts a provided year, month, and day into a date.'
  }, {
    label: 'DATEDIF',
    syntaxParameter: [1, 1],
    syntax: 'DATEDIF(start_date, end_date, unit)',
    description: 'Calculates the number of days, months, or years between two dates.'
  }, {
    label: 'DATEVALUE',
    syntaxParameter: [1],
    syntax: 'DATEVALUE(date_string)',
    description: 'Converts a provided date string in a known format to a date value.'
  }, {
    label: 'DAY',
    syntaxParameter: [1],
    syntax: 'DAY(date)',
    description: 'Returns the day of the month that a specific date falls on, in numeric format.'
  }, {
    label: 'DAYS',
    syntaxParameter: [1, 1],
    syntax: 'DAYS(end_date, start_date)',
    description: 'Returns the number of days between two dates.'
  }, {
    label: 'DAYS360',
    syntaxParameter: [1, 1, 0],
    syntax: 'DAYS360(start_date, end_date, [method])',
    description: 'Returns the difference between two days based on the 360 day year used in some financial interest calculations.'
  }, {
    label: 'EDATE',
    syntaxParameter: [1, 1],
    syntax: 'EDATE(start_date, months)',
    description: 'Returns a date a specified number of months before or after another date.'
  }, {
    label: 'EOMONTH',
    syntaxParameter: [1, 1],
    syntax: 'EOMONTH(start_date, months)',
    description: 'Returns a date representing the last day of a month which falls a specified number of months before or after another date.'
  }, {
    label: 'HOUR',
    syntaxParameter: [1],
    syntax: 'HOUR(time)',
    description: 'Returns the hour component of a specific time, in numeric format.'
  }, {
    label: 'ISOWEEKNUM',
    syntaxParameter: [1],
    syntax: 'ISOWEEKNUM(date)',
    description: 'Returns the number of the ISO week of the year where the provided date falls.'
  }, {
    label: 'MINUTE',
    syntaxParameter: [1],
    syntax: 'MINUTE(time)',
    description: 'Returns the minute component of a specific time, in numeric format.'
  }, {
    label: 'MONTH',
    syntaxParameter: [1],
    syntax: 'MONTH(date)',
    description: 'Returns the month of the year a specific date falls in, in numeric format.'
  }, {
    label: 'NETWORKDAYS',
    syntaxParameter: [1, 1, 0],
    syntax: 'NETWORKDAYS(start_date, end_date, [holidays])',
    description: 'Returns the number of net working days between two provided days.'
  }, {
    label: 'NETWORKDAYS.INTL',
    syntaxParameter: [1, 1, 0, 0],
    syntax: 'NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])',
    description: 'Returns the number of net working days between two provided days excluding specified weekend days and holidays.'
  }, {
    label: 'NOW',
    syntaxParameter: [],
    syntax: 'NOW()',
    description: 'Returns the current date and time as a date value.'
  }, {
    label: 'SECOND',
    syntaxParameter: [1],
    syntax: 'SECOND(time)',
    description: 'Returns the second component of a specific time, in numeric format.'
  }, {
    label: 'TIME',
    syntaxParameter: [1, 1, 1],
    syntax: 'TIME(hour, minute, second)',
    description: 'Converts a provided hour, minute, and second into a time.'
  }, {
    label: 'TIMEVALUE',
    syntaxParameter: [1],
    syntax: 'TIMEVALUE(time_string)',
    description: 'Returns the fraction of a 24-hour day the time represents.'
  }, {
    label: 'TODAY',
    syntaxParameter: [],
    syntax: 'TODAY()',
    description: 'Returns the current date as a date value.'
  }, {
    label: 'WEEKDAY',
    syntaxParameter: [1, 0],
    syntax: 'WEEKDAY(date, [type])',
    description: 'Returns a number representing the day of the week of the date provided.'
  }, {
    label: 'WEEKNUM',
    syntaxParameter: [1, 0],
    syntax: 'WEEKNUM(date, [type])',
    description: 'Returns a number representing the week of the year where the provided date falls.'
  }, {
    label: 'WORKDAY',
    syntaxParameter: [1, 1, 0],
    syntax: 'WORKDAY(start_date, num_days, [holidays])',
    description: 'Calculates the end date after a specified number of working days.'
  }, {
    label: 'WORKDAY.INTL',
    syntaxParameter: [1, 1, 0, 0],
    syntax: 'WORKDAY.INTL(start_date, num_days, [weekend], [holidays])',
    description: 'Calculates the date after a specified number of workdays excluding specified weekend days and holidays.'
  }, {
    label: 'YEAR',
    syntaxParameter: [1],
    syntax: 'YEAR(date)',
    description: 'Returns the year specified by a given date.'
  }, {
    label: 'YEARFRAC',
    syntaxParameter: [1, 1, 0],
    syntax: 'YEARFRAC(start_date, end_date, [day_count_convention])',
    description: 'Returns the number of years, including fractional years, between two dates using a specified day count convention.'
  }, {
    label: 'BIN2DEC',
    syntaxParameter: [1],
    syntax: 'BIN2DEC(signed_binary_number)',
    description: 'Converts a signed binary number to decimal format.'
  }, {
    label: 'BIN2HEX',
    syntaxParameter: [1, 0],
    syntax: 'BIN2HEX(signed_binary_number, [significant_digits])',
    description: 'Converts a signed binary number to signed hexadecimal format.'
  }, {
    label: 'FILTER',
    syntaxParameter: [1, 1, 0],
    syntax: 'FILTER(range, condition1, [condition2])',
    description: 'Returns a filtered version of the source range, returning only rows or columns which meet the specified conditions.'
  }, {
    label: 'SORT',
    syntaxParameter: [1, 1, 1, 0, 0],
    syntax: 'SORT(range, sort_column, is_ascending, [sort_column2], [is_ascending2])',
    description: 'Sorts the rows of a given array or range by the values in one or more columns.'
  }, {
    label: 'SORTN',
    syntaxParameter: [1, 0, 0, 0, 1000],
    syntax: 'SORTN(range, [n], [display_ties_mode], [sort_column1, is_ascending1], ...)',
    description: 'Returns the first n items in a data set after performing a sort.'
  }, {
    label: 'UNIQUE',
    syntaxParameter: [1],
    syntax: 'UNIQUE(range)',
    description: 'Returns unique rows in the provided source range, discarding duplicatesRows are returned in the order in which they first appear in the source range.'
  }, {
    label: 'ACCRINT',
    syntaxParameter: [1, 1, 1, 1, 1, 1, 0],
    syntax: 'ACCRINT(issue, first_payment, settlement, rate, redemption, frequency, [day_count_convention])',
    description: 'Calculates the accrued interest of a security that has periodic payments.'
  }, {
    label: 'PRICEDISC',
    syntaxParameter: [1, 1, 1, 1, 0],
    syntax: 'PRICEDISC(settlement, maturity, discount, redemption, [day_count_convention])',
    description: 'Calculates the price of a discount (non-interest-bearing) security, based on expected yield.'
  }, {
    label: 'PRICEMAT',
    syntaxParameter: [1, 1, 1, 1, 1, 0],
    syntax: 'PRICEMAT(settlement, maturity, issue, rate, yield, [day_count_convention])',
    description: 'Calculates the price of a security paying interest at maturity, based on expected yield.'
  }, {
    label: 'PV',
    syntaxParameter: [1, 1, 1, 0, 0],
    syntax: 'PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning])',
    description: 'Calculates the present value of an annuity investment based on constant-amount periodic payments and a constant interest rate.'
  }, {
    label: 'RATE',
    syntaxParameter: [1, 1, 1, 1, 0, 0, 0],
    syntax: 'RATE(number_of_periods, payment_per_period, present_value, [future_value], [end_or_beginning], [rate_guess])',
    description: 'Calculates the interest rate of an annuity investment based on constant-amount periodic payments and the assumption of a constant interest rate.'
  }, {
    label: 'RECEIVED',
    syntaxParameter: [1, 1, 1, 1, 0],
    syntax: 'RECEIVED(settlement, maturity, investment, discount, [day_count_convention])',
    description: 'Calculates the amount received at maturity for an investment in fixed-income securities purchased on a given date.'
  }, {
    label: 'RRI',
    syntaxParameter: [1, 1, 1],
    syntax: 'RRI(number_of_periods, present_value, future_value)',
    description: 'Returns the interest rate needed for an investment to reach a specific value within a given number of periods.'
  }, {
    label: 'SLN',
    syntaxParameter: [1, 1, 1],
    syntax: 'SLN(cost, salvage, life)',
    description: 'Calculates the depreciation of an asset for one period using the straight-line method.'
  }, {
    label: 'SYD',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'SYD(cost, salvage, life, period)',
    description: 'Calculates the depreciation of an asset for a specified period using the sum of years digits method.'
  }, {
    label: 'TBILLEQ',
    syntaxParameter: [1, 1, 1],
    syntax: 'TBILLEQ(settlement, maturity, discount)',
    description: 'Calculates the equivalent annualized rate of return of a US Treasury Bill based on discount rate.'
  }, {
    label: 'TBILLPRICE',
    syntaxParameter: [1, 1, 1],
    syntax: 'TBILLPRICE(settlement, maturity, discount)',
    description: 'Calculates the price of a US Treasury Bill based on discount rate.'
  }, {
    label: 'TBILLYIELD',
    syntaxParameter: [1, 1, 1],
    syntax: 'TBILLYIELD(settlement, maturity, price)',
    description: 'Calculates the yield of a US Treasury Bill based on price.'
  }, {
    label: 'VDB',
    syntaxParameter: [1, 1, 1, 1, 1, 0, 0],
    syntax: 'VDB(cost, salvage, life, start_period, end_period, [factor], [no_switch])',
    description: 'Returns the depreciation of an asset for a particular period (or partial period).'
  }, {
    label: 'XIRR',
    syntaxParameter: [1, 1, 0],
    syntax: 'XIRR(cashflow_amounts, cashflow_dates, [rate_guess])',
    description: 'Calculates the internal rate of return of an investment based on a specified series of potentially irregularly spaced cash flows.'
  }, {
    label: 'XNPV',
    syntaxParameter: [1, 1, 1],
    syntax: 'XNPV(discount, cashflow_amounts, cashflow_dates)',
    description: 'Calculates the net present value of an investment based on a specified series of potentially irregularly spaced cash flows and a discount rate.'
  }, {
    label: 'YIELD',
    syntaxParameter: [1, 1, 1, 1, 1, 0],
    syntax: 'YIELD(settlement, maturity, rate, price, redemption, frequency, [day_count_convention])',
    description: 'Calculates the annual yield of a security paying periodic interest, such as a US Treasury Bond, based on price.'
  }, {
    label: 'YIELDDISC',
    syntaxParameter: [1, 1, 1, 1, 0],
    syntax: 'YIELDDISC(settlement, maturity, price, redemption, [day_count_convention])',
    description: 'Calculates the annual yield of a discount (non-interest-bearing) security, based on price.'
  }, {
    label: 'YIELDMAT',
    syntaxParameter: [1, 1, 1, 1, 1, 0],
    syntax: 'YIELDMAT(settlement, maturity, issue, rate, price, [day_count_convention])',
    description: 'Calculates the annual yield of a security paying interest at maturity, based on price.'
  }, {
    label: 'ARRAYFORMULA',
    syntaxParameter: [1],
    syntax: 'ARRAYFORMULA(array_formula)',
    description: 'Enables the display of values returned from an array formula into multiple rows and/or columns and the use of non-array functions with arrays.'
  }, {
    label: 'DETECTLANGUAGE',
    syntaxParameter: [1],
    syntax: 'DETECTLANGUAGE(text_or_range)',
    description: 'Identifies the language used in text within the specified range.'
  }, {
    label: 'GOOGLEFINANCE',
    syntaxParameter: [1, 0, 0, 0, 0],
    syntax: 'GOOGLEFINANCE(ticker, [attribute], [start_date], [end_date|num_days], [interval])',
    description: 'Fetches current or historical securities information from Google Finance.'
  }, {
    label: 'GOOGLETRANSLATE',
    syntaxParameter: [1, 0, 0],
    syntax: 'GOOGLETRANSLATE(text, [source_language], [target_language])',
    description: 'Translates text from one language into another'
  }, {
    label: 'IMAGE',
    syntaxParameter: [1, 0, 0, 0],
    syntax: 'IMAGE(url, [mode], [height], [width])',
    description: 'Inserts an image into a cell.'
  }, {
    label: 'QUERY',
    syntaxParameter: [1, 1, 0],
    syntax: 'QUERY(data, query, [headers])',
    description: 'Runs a Google Visualization API Query Language query across data.'
  }, {
    label: 'SPARKLINE',
    syntaxParameter: [1, 0],
    syntax: 'SPARKLINE(data, [options])',
    description: 'Creates a miniature chart contained within a single cell.'
  }, {
    label: 'ERROR.TYPE',
    syntaxParameter: [1],
    syntax: 'ERROR.TYPE(reference)',
    description: 'Returns a number corresponding to the error value in a different cell.'
  }, {
    label: 'ISBLANK',
    syntaxParameter: [1],
    syntax: 'ISBLANK(value)',
    description: 'Checks whether the referenced cell is empty.'
  }, {
    label: 'ISDATE',
    syntaxParameter: [1],
    syntax: 'ISDATE(value)',
    description: 'Returns whether a value is a date.'
  }, {
    label: 'ISEMAIL',
    syntaxParameter: [1],
    syntax: 'ISEMAIL(value)',
    description: 'Checks whether a value is a valid email address.'
  }, {
    label: 'ISERR',
    syntaxParameter: [1],
    syntax: 'ISERR(value)',
    description: 'Checks whether a value is an error other than `#N/A`.'
  }, {
    label: 'ISERROR',
    syntaxParameter: [1],
    syntax: 'ISERROR(value)',
    description: 'Checks whether a value is an error.'
  }, {
    label: 'ISFORMULA',
    syntaxParameter: [1],
    syntax: 'ISFORMULA(cell)',
    description: 'Checks whether a formula is in the referenced cell.'
  }, {
    label: 'ISLOGICAL',
    syntaxParameter: [1],
    syntax: 'ISLOGICAL(value)',
    description: 'Checks whether a value is `TRUE` or `FALSE`.'
  }, {
    label: 'ISNA',
    syntaxParameter: [1],
    syntax: 'ISNA(value)',
    description: 'Checks whether a value is the error `#N/A`.'
  }, {
    label: 'ISNONTEXT',
    syntaxParameter: [1],
    syntax: 'ISNONTEXT(value)',
    description: 'Checks whether a value is non-textual.'
  }, {
    label: 'ISNUMBER',
    syntaxParameter: [],
    syntax: 'ISNUMBER(value)',
    description: 'Checks whether a value is a number.'
  }, {
    label: 'ISREF',
    syntaxParameter: [1],
    syntax: 'ISREF(value)',
    description: 'Checks whether a value is a valid cell reference.'
  }, {
    label: 'ISTEXT',
    syntaxParameter: [1],
    syntax: 'ISTEXT(value)',
    description: 'Checks whether a value is text.'
  }, {
    label: 'N',
    syntaxParameter: [1],
    syntax: 'N(value)',
    description: 'Returns the argument provided as a number.'
  }, {
    label: 'NA',
    syntaxParameter: [],
    syntax: 'NA()',
    description: 'Returns the "value not available" error, `#N/A`.'
  }, {
    label: 'TYPE',
    syntaxParameter: [1],
    syntax: 'TYPE(value)',
    description: 'Returns a number associated with the type of data passed into the function.'
  }, {
    label: 'CELL',
    syntaxParameter: [1, 1],
    syntax: 'CELL(info_type, reference)',
    description: 'Returns the requested information about the specified cell.'
  }, {
    label: 'AND',
    syntaxParameter: [1, 1000],
    syntax: 'AND(logical_expression1, [logical_expression2, ...])',
    description: 'Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.'
  }, {
    label: 'FALSE',
    syntaxParameter: [],
    syntax: 'FALSE()',
    description: 'Returns the logical value `FALSE`.'
  }, {
    label: 'IF',
    syntaxParameter: [1, 1, 1],
    syntax: 'IF(logical_expression, value_if_true, value_if_false)',
    description: 'Returns one value if a logical expression is `TRUE` and another if it is `FALSE`.'
  }, {
    label: 'IFERROR',
    syntaxParameter: [1, 0],
    syntax: 'IFERROR(value, [value_if_error])',
    description: 'Returns the first argument if it is not an error value, otherwise returns the second argument if present, or a blank if the second argument is absent.'
  }, {
    label: 'IFNA',
    syntaxParameter: [1, 1],
    syntax: 'IFNA(value, value_if_na)',
    description: 'Evaluates a valueIf the value is an #N/A error, returns the specified value.'
  }, {
    label: 'IFS',
    syntaxParameter: [1, 1, 1000],
    syntax: 'IFS(condition1, value1, [condition2, value2], …)',
    description: 'Evaluates multiple conditions and returns a value that corresponds to the first true condition'
  }, {
    label: 'NOT',
    syntaxParameter: [1],
    syntax: 'NOT(logical_expression)',
    description: 'Returns the opposite of a logical value - `NOT(TRUE)` returns `FALSE`; `NOT(FALSE)` returns `TRUE`.'
  }, {
    label: 'OR',
    syntaxParameter: [1, 1000],
    syntax: 'OR(logical_expression1, [logical_expression2, ...])',
    description: 'Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false.'
  }, {
    label: 'SWITCH',
    syntaxParameter: [1, 1, 1, 0, 1000],
    syntax: 'SWITCH(expression, case1, value1, [default or case2, value2], …)',
    description: 'Tests an expression against a list of cases and returns the corresponding value of the first matching case, with an optional default value if nothing else is met.'
  }, {
    label: 'TRUE',
    syntaxParameter: [],
    syntax: 'TRUE()',
    description: 'Returns the logical value `TRUE`.'
  }, {
    label: 'XOR',
    syntaxParameter: [1, 1000],
    syntax: 'XOR(logical_expression1, [logical_expression2, ...])',
    description: 'The XOR function performs an exclusive or of 2 numbers that returns a 1 if the numbers are different, and a 0 otherwise.'
  }, {
    label: 'ADDRESS',
    syntaxParameter: [1, 1, 0, 0, 0],
    syntax: 'ADDRESS(row, column, [absolute_relative_mode], [use_a1_notation], [sheet])',
    description: 'Returns a cell reference as a string.'
  }, {
    label: 'CHOOSE',
    syntaxParameter: [1, 1, 1000],
    syntax: 'CHOOSE(index, choice1, [choice2, ...])',
    description: 'Returns an element from a list of choices based on index.'
  }, {
    label: 'COLUMN',
    syntaxParameter: [0],
    syntax: 'COLUMN([cell_reference])',
    description: 'Returns the column number of a specified cell, with `A=1`.'
  }, {
    label: 'COLUMNS',
    syntaxParameter: [1],
    syntax: 'COLUMNS(range)',
    description: 'Returns the number of columns in a specified array or range.'
  }, {
    label: 'FORMULATEXT',
    syntaxParameter: [1],
    syntax: 'FORMULATEXT(cell)',
    description: 'Returns the formula as a string.'
  }, {
    label: 'GETPIVOTDATA',
    syntaxParameter: [1, 1, 1000],
    syntax: 'GETPIVOTDATA(value_name, any_pivot_table_cell, [original_column, ...], [pivot_item, ...]',
    description: 'Extracts an aggregated value from a pivot table that corresponds to the specified row and column headings.'
  }, {
    label: 'HLOOKUP',
    syntaxParameter: [1, 1, 1, 0],
    syntax: 'HLOOKUP(search_key, range, index, [is_sorted])',
    description: 'Horizontal lookupSearches across the first row of a range for a key and returns the value of a specified cell in the column found.'
  }, {
    label: 'INDEX',
    syntaxParameter: [1, 0, 0],
    syntax: 'INDEX(reference, [row], [column])',
    description: 'Returns the content of a cell, specified by row and column offset.'
  }, {
    label: 'INDIRECT',
    syntaxParameter: [1, 0],
    syntax: 'INDIRECT(cell_reference_as_string, [is_A1_notation])',
    description: 'Returns a cell reference specified by a string.'
  }, {
    label: 'LOOKUP',
    syntaxParameter: [1, 1, 0],
    syntax: 'LOOKUP(search_key, search_range|search_result_array, [result_range])',
    description: 'Looks through a row or column for a key and returns the value of the cell in a result range located in the same position as the search row or column.'
  }, {
    label: 'MATCH',
    syntaxParameter: [1, 1, 0],
    syntax: 'MATCH(search_key, range, [search_type])',
    description: 'Returns the relative position of an item in a range that matches a specified value.'
  }, {
    label: 'OFFSET',
    syntaxParameter: [1, 1, 1, 0, 0],
    syntax: 'OFFSET(cell_reference, offset_rows, offset_columns, [height], [width])',
    description: 'Returns a range reference shifted a specified number of rows and columns from a starting cell reference.'
  }, {
    label: 'ROW',
    syntaxParameter: [1],
    syntax: 'ROW([cell_reference])',
    description: 'Returns the row number of a specified cell.'
  }, {
    label: 'ROWS',
    syntaxParameter: [1],
    syntax: 'ROWS(range)',
    description: 'Returns the number of rows in a specified array or range.'
  }, {
    label: 'VLOOKUP',
    syntaxParameter: [1, 1, 1, 0],
    syntax: 'VLOOKUP(search_key, range, index, [is_sorted])',
    description: 'Vertical lookupSearches down the first column of a range for a key and returns the value of a specified cell in the row found.'
  }, {
    label: 'ABS',
    syntaxParameter: [1],
    syntax: 'ABS(value)',
    description: 'Returns the absolute value of a number.'
  }, {
    label: 'ACOS',
    syntaxParameter: [1],
    syntax: 'ACOS(value)',
    description: 'Returns the inverse cosine of a value, in radians.'
  }, {
    label: 'ACOSH',
    syntaxParameter: [1],
    syntax: 'ACOSH(value)',
    description: 'Returns the inverse hyperbolic cosine of a number.'
  }, {
    label: 'ACOT',
    syntaxParameter: [1],
    syntax: 'ACOT(value)',
    description: 'Returns the inverse cotangent of a value, in radians.'
  }, {
    label: 'ACOTH',
    syntaxParameter: [1],
    syntax: 'ACOTH(value)',
    description: 'Returns the inverse hyperbolic cotangent of a value, in radiansMust not be between -1 and 1, inclusive.'
  }, {
    label: 'ASIN',
    syntaxParameter: [1],
    syntax: 'ASIN(value)',
    description: 'Returns the inverse sine of a value, in radians.'
  }, {
    label: 'ASINH',
    syntaxParameter: [1],
    syntax: 'ASINH(value)',
    description: 'Returns the inverse hyperbolic sine of a number.'
  }, {
    label: 'ATAN',
    syntaxParameter: [1],
    syntax: 'ATAN(value)',
    description: 'Returns the inverse tangent of a value, in radians.'
  }, {
    label: 'ATAN2',
    syntaxParameter: [1, 1],
    syntax: 'ATAN2(x, y)',
    description: 'Returns the angle between the x-axis and a line segment from the origin (0,0) to specified coordinate pair (`x`,`y`), in radians.'
  }, {
    label: 'ATANH',
    syntaxParameter: [1],
    syntax: 'ATANH(value)',
    description: 'Returns the inverse hyperbolic tangent of a number.'
  }, {
    label: 'BASE',
    syntaxParameter: [1, 1, 0],
    syntax: 'BASE(value, base, [min_length])',
    description: 'Converts a number into a text representation in another base, for example, base 2 for binary.'
  }, {
    label: 'CEILING',
    syntaxParameter: [1, 0],
    syntax: 'CEILING(value, [factor])',
    description: 'Rounds a number up to the nearest integer multiple of specified significance.'
  }, {
    label: 'CEILING.MATH',
    syntaxParameter: [1, 0, 0],
    syntax: 'CEILING.MATH(number, [significance], [mode])',
    description: 'Rounds a number up to the nearest integer multiple of specified significance, with negative numbers rounding toward or away from 0 depending on the mode.'
  }, {
    label: 'CEILING.PRECISE',
    syntaxParameter: [1, 0],
    syntax: 'CEILING.PRECISE(number, [significance])',
    description: 'Rounds a number up to the nearest integer multiple of specified significanceIf the number is positive or negative, it is rounded up.'
  }, {
    label: 'COMBIN',
    syntaxParameter: [1, 1],
    syntax: 'COMBIN(n, k)',
    description: 'Returns the number of ways to choose some number of objects from a pool of a given size of objects.'
  }, {
    label: 'COMBINA',
    syntaxParameter: [1, 1],
    syntax: 'COMBINA(n, k)',
    description: 'Returns the number of ways to choose some number of objects from a pool of a given size of objects, including ways that choose the same object multiple times.'
  }, {
    label: 'COS',
    syntaxParameter: [1],
    syntax: 'COS(angle)',
    description: 'Returns the cosine of an angle provided in radians.'
  }, {
    label: 'COSH',
    syntaxParameter: [1],
    syntax: 'COSH(value)',
    description: 'Returns the hyperbolic cosine of any real number.'
  }, {
    label: 'COT',
    syntaxParameter: [1],
    syntax: 'COT(angle)',
    description: 'Cotangent of an angle provided in radians.'
  }, {
    label: 'COTH',
    syntaxParameter: [1],
    syntax: 'COTH(value)',
    description: 'Returns the hyperbolic cotangent of any real number.'
  }, {
    label: 'COUNTBLANK',
    syntaxParameter: [1],
    syntax: 'COUNTBLANK(range)',
    description: 'Returns the number of empty cells in a given range.'
  }, {
    label: 'COUNTIF',
    syntaxParameter: [1, 1],
    syntax: 'COUNTIF(range, criterion)',
    description: 'Returns a conditional count across a range.'
  }, {
    label: 'COUNTIFS',
    syntaxParameter: [1, 1, 1000],
    syntax: 'COUNTIFS(criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    description: 'Returns the count of a range depending on multiple criteria.'
  }, {
    label: 'COUNTUNIQUE',
    syntaxParameter: [1, 1000],
    syntax: 'COUNTUNIQUE(value1, [value2, ...])',
    description: 'Counts the number of unique values in a list of specified values and ranges.'
  }, {
    label: 'CSC',
    syntaxParameter: [1],
    syntax: 'CSC(angle)',
    description: 'Returns the cosecant of an angle provided in radians.'
  }, {
    label: 'CSCH',
    syntaxParameter: [],
    syntax: 'CSCH(value)',
    description: 'The CSCH function returns the hyperbolic cosecant of any real number.'
  }, {
    label: 'DECIMAL',
    syntaxParameter: [1],
    syntax: 'DECIMAL(value, base)',
    description: 'The DECIMAL function converts the text representation of a number in another base, to base 10 (decimal).'
  }, {
    label: 'DEGREES',
    syntaxParameter: [1],
    syntax: 'DEGREES(angle)',
    description: 'Converts an angle value in radians to degrees.'
  }, {
    label: 'ERFC',
    syntaxParameter: [1],
    syntax: 'ERFC(z)',
    description: 'Returns the complementary Gauss error function of a value.'
  }, {
    label: 'ERFC.PRECISE',
    syntaxParameter: [1],
    syntax: 'ERFC.PRECISE(z)',
    description: 'See ERFC'
  }, {
    label: 'EVEN',
    syntaxParameter: [1],
    syntax: 'EVEN(value)',
    description: 'Rounds a number up to the nearest even integer.'
  }, {
    label: 'EXP',
    syntaxParameter: [1],
    syntax: 'EXP(exponent)',
    description: 'Returns Euler\'s number, e (~2.718) raised to a power.'
  }, {
    label: 'FACT',
    syntaxParameter: [1],
    syntax: 'FACT(value)',
    description: 'Returns the factorial of a number.'
  }, {
    label: 'FACTDOUBLE',
    syntaxParameter: [1],
    syntax: 'FACTDOUBLE(value)',
    description: 'Returns the "double factorial" of a number.'
  }, {
    label: 'FLOOR',
    syntaxParameter: [1, 0],
    syntax: 'FLOOR(value, [factor])',
    description: 'Rounds a number down to the nearest integer multiple of specified significance.'
  }, {
    label: 'FLOOR.MATH',
    syntaxParameter: [1],
    syntax: 'FLOOR.MATH(number, [significance], [mode])',
    description: 'Rounds a number down to the nearest integer multiple of specified significance, with negative numbers rounding toward or away from 0 depending on the mode.'
  }, {
    label: 'FLOOR.PRECISE',
    syntaxParameter: [1],
    syntax: 'FLOOR.PRECISE(number, [significance])',
    description: 'The FLOOR.PRECISE function rounds a number down to the nearest integer or multiple of specified significance.'
  }, {
    label: 'GAMMALN',
    syntaxParameter: [1],
    syntax: 'GAMMALN(value)',
    description: 'Returns the the logarithm of a specified Gamma function, base e (Euler\'s number).'
  }, {
    label: 'GAMMALN.PRECISE',
    syntaxParameter: [1],
    syntax: 'GAMMALN.PRECISE(value)',
    description: 'See GAMMALN '
  }, {
    label: 'GCD',
    syntaxParameter: [1, 1],
    syntax: 'GCD(value1, value2)',
    description: 'Returns the greatest common divisor of one or more integers.'
  }, {
    label: 'IMLN',
    syntaxParameter: [1],
    syntax: 'IMLN(complex_value)',
    description: 'Returns the logarithm of a complex number, base e (Euler\'s number).'
  }, {
    label: 'IMPOWER',
    syntaxParameter: [1, 1],
    syntax: 'IMPOWER(complex_base, exponent)',
    description: 'Returns a complex number raised to a power.'
  }, {
    label: 'IMSQRT',
    syntaxParameter: [1],
    syntax: 'IMSQRT(complex_number)',
    description: 'Computes the square root of a complex number.'
  }, {
    label: 'INT',
    syntaxParameter: [1],
    syntax: 'INT(value)',
    description: 'Rounds a number down to the nearest integer that is less than or equal to it.'
  }, {
    label: 'ISEVEN',
    syntaxParameter: [1],
    syntax: 'ISEVEN(value)',
    description: 'Checks whether the provided value is even.'
  }, {
    label: 'ISO.CEILING',
    syntaxParameter: [1, 0],
    syntax: 'ISO.CEILING(number, [significance])',
    description: 'See CEILING.PRECISE '
  }, {
    label: 'ISODD',
    syntaxParameter: [1],
    syntax: 'ISODD(value)',
    description: 'Checks whether the provided value is odd.'
  }, {
    label: 'LCM',
    syntaxParameter: [1, 1],
    syntax: 'LCM(value1, value2)',
    description: 'Returns the least common multiple of one or more integers.'
  }, {
    label: 'LN',
    syntaxParameter: [1],
    syntax: 'LN(value)',
    description: 'Returns the the logarithm of a number, base e (Euler\'s number).'
  }, {
    label: 'LOG',
    syntaxParameter: [1, 1],
    syntax: 'LOG(value, base)',
    description: 'Returns the the logarithm of a number given a base.'
  }, {
    label: 'LOG10',
    syntaxParameter: [1],
    syntax: 'LOG10(value)',
    description: 'Returns the the logarithm of a number, base 10.'
  }, {
    label: 'MOD',
    syntaxParameter: [1, 1],
    syntax: 'MOD(dividend, divisor)',
    description: 'Returns the result of the modulo operator, the remainder after a division operation.'
  }, {
    label: 'MROUND',
    syntaxParameter: [1, 1],
    syntax: 'MROUND(value, factor)',
    description: 'Rounds one number to the nearest integer multiple of another.'
  }, {
    label: 'MULTINOMIAL',
    syntaxParameter: [1, 1],
    syntax: 'MULTINOMIAL(value1, value2)',
    description: 'Returns the factorial of the sum of values divided by the product of the values\'factorials.'
  }, {
    label: 'MUNIT',
    syntaxParameter: [1],
    syntax: 'MUNIT(dimension)',
    description: 'Returns a unit matrix of size dimension x dimension.'
  }, {
    label: 'ODD',
    syntaxParameter: [1],
    syntax: 'ODD(value)',
    description: 'Rounds a number up to the nearest odd integer.'
  }, {
    label: 'PI',
    syntaxParameter: [],
    syntax: 'PI()',
    description: 'Returns the value of Pi to 14 decimal places.'
  }, {
    label: 'POWER',
    syntaxParameter: [1, 1],
    syntax: 'POWER(base, exponent)',
    description: 'Returns a number raised to a power.'
  }, {
    label: 'PRODUCT',
    syntaxParameter: [1, 1000],
    syntax: 'PRODUCT(factor1, [factor2, ...])',
    description: 'Returns the result of multiplying a series of numbers together.'
  }, {
    label: 'QUOTIENT',
    syntaxParameter: [1, 1],
    syntax: 'QUOTIENT(dividend, divisor)',
    description: 'Returns one number divided by another.'
  }, {
    label: 'RADIANS',
    syntaxParameter: [1],
    syntax: 'RADIANS(angle)',
    description: 'Converts an angle value in degrees to radians.'
  }, {
    label: 'RAND',
    syntaxParameter: [],
    syntax: 'RAND()',
    description: 'Returns a random number between 0 inclusive and 1 exclusive.'
  }, {
    label: 'RANDARRAY',
    syntaxParameter: [1, 1],
    syntax: 'RANDARRAY(rows, columns)',
    description: 'Generates an array of random numbers between 0 and 1.'
  }, {
    label: 'RANDBETWEEN',
    syntaxParameter: [1, 1],
    syntax: 'RANDBETWEEN(low, high)',
    description: 'Returns a uniformly random integer between two values, inclusive.'
  }, {
    label: 'ROUND',
    syntaxParameter: [1, 0],
    syntax: 'ROUND(value, [places])',
    description: 'Rounds a number to a certain number of decimal places according to standard rules.'
  }, {
    label: 'ROUNDDOWN',
    syntaxParameter: [1, 0],
    syntax: 'ROUNDDOWN(value, [places])',
    description: 'Rounds a number to a certain number of decimal places, always rounding down to the next valid increment.'
  }, {
    label: 'ROUNDUP',
    syntaxParameter: [1, 0],
    syntax: 'ROUNDUP(value, [places])',
    description: 'Rounds a number to a certain number of decimal places, always rounding up to the next valid increment.'
  }, {
    label: 'SEC',
    syntaxParameter: [1],
    syntax: 'SEC(angle)',
    description: 'The SEC function returns the secant of an angle, measured in radians.'
  }, {
    label: 'SECH',
    syntaxParameter: [1],
    syntax: 'SECH(value)',
    description: 'The SECH function returns the hyperbolic secant of an angle.'
  }, {
    label: 'SEQUENCE',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'SEQUENCE(rows, columns, start, step)',
    description: 'Returns an array of sequential numbers, such as 1, 2, 3, 4.'
  }, {
    label: 'SERIESSUM',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'SERIESSUM(x, n, m, a)',
    description: 'Given parameters x, n, m, and a, returns the power series sum a1xn + a2x(n+m) + .+ aix(n+(i-1)m), where i is the number of entries in range `a`.'
  }, {
    label: 'SIGN',
    syntaxParameter: [1],
    syntax: 'SIGN(value)',
    description: 'Given an input number, returns `-1` if it is negative, `1` if positive, and `0` if it is zero.'
  }, {
    label: 'SIN',
    syntaxParameter: [1],
    syntax: 'SIN(angle)',
    description: 'Returns the sine of an angle provided in radians.'
  }, {
    label: 'SINH',
    syntaxParameter: [1],
    syntax: 'SINH(value)',
    description: 'Returns the hyperbolic sine of any real number.'
  }, {
    label: 'SQRT',
    syntaxParameter: [1],
    syntax: 'SQRT(value)',
    description: 'Returns the positive square root of a positive number.'
  }, {
    label: 'SQRTPI',
    syntaxParameter: [1],
    syntax: 'SQRTPI(value)',
    description: 'Returns the positive square root of the product of Pi and the given positive number.'
  }, {
    label: 'SUBTOTAL',
    syntaxParameter: [1, 1, 1000],
    syntax: 'SUBTOTAL(function_code, range1, [range2, ...])',
    description: 'Returns a subtotal for a vertical range of cells using a specified aggregation function.'
  }, {
    label: 'SUM',
    syntaxParameter: [1, 1000],
    syntax: 'SUM(value1, [value2, ...])',
    description: 'Returns the sum of a series of numbers and/or cells.'
  }, {
    label: 'SUMIF',
    syntaxParameter: [1, 1, 0],
    syntax: 'SUMIF(range, criterion, [sum_range])',
    description: 'Returns a conditional sum across a range.'
  }, {
    label: 'SUMIFS',
    syntaxParameter: [1, 1, 1, 1000],
    syntax: 'SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    description: 'Returns the sum of a range depending on multiple criteria.'
  }, {
    label: 'SUMSQ',
    syntaxParameter: [1, 1000],
    syntax: 'SUMSQ(value1, [value2, ...])',
    description: 'Returns the sum of the squares of a series of numbers and/or cells.'
  }, {
    label: 'TAN',
    syntaxParameter: [1],
    syntax: 'TAN(angle)',
    description: 'Returns the tangent of an angle provided in radians.'
  }, {
    label: 'TANH',
    syntaxParameter: [1],
    syntax: 'TANH(value)',
    description: 'Returns the hyperbolic tangent of any real number.'
  }, {
    label: 'TRUNC',
    syntaxParameter: [1, 0],
    syntax: 'TRUNC(value, [places])',
    description: 'Truncates a number to a certain number of significant digits by omitting less significant digits.'
  }, {
    label: 'ADD',
    syntaxParameter: [1, 1],
    syntax: 'ADD(value1, value2)',
    description: 'Returns the sum of two numbersEquivalent to the `+` operator.'
  }, {
    label: 'CONCAT',
    syntaxParameter: [1, 1],
    syntax: 'CONCAT(value1, value2)',
    description: 'Returns the concatenation of two valuesEquivalent to the `&` operator.'
  }, {
    label: 'DIVIDE',
    syntaxParameter: [1, 1],
    syntax: 'DIVIDE(dividend, divisor)',
    description: 'Returns one number divided by anotherEquivalent to the `/` operator.'
  }, {
    label: 'EQ',
    syntaxParameter: [1, 1],
    syntax: 'EQ(value1, value2)',
    description: 'Returns `TRUE` if two specified values are equal and `FALSE` otherwiseEquivalent to the `=` operator.'
  }, {
    label: 'GT',
    syntaxParameter: [1, 1],
    syntax: 'GT(value1, value2)',
    description: 'Returns `TRUE` if the first argument is strictly greater than the second, and `FALSE` otherwiseEquivalent to the `>` operator.'
  }, {
    label: 'GTE',
    syntaxParameter: [1, 1],
    syntax: 'GTE(value1, value2)',
    description: 'Returns `TRUE` if the first argument is greater than or equal to the second, and `FALSE` otherwiseEquivalent to the `>=` operator.'
  }, {
    label: 'LT',
    syntaxParameter: [1, 1],
    syntax: 'LT(value1, value2)',
    description: 'Returns `TRUE` if the first argument is strictly less than the second, and `FALSE` otherwiseEquivalent to the `<` operator.'
  }, {
    label: 'LTE',
    syntaxParameter: [1, 1],
    syntax: 'LTE(value1, value2)',
    description: 'Returns `TRUE` if the first argument is less than or equal to the second, and `FALSE` otherwiseEquivalent to the `<=` operator.'
  }, {
    label: 'MINUS',
    syntaxParameter: [1, 1],
    syntax: 'MINUS(value1, value2)',
    description: 'Returns the difference of two numbersEquivalent to the `-` operator.'
  }, {
    label: 'MULTIPLY',
    syntaxParameter: [1, 1],
    syntax: 'MULTIPLY(factor1, factor2)',
    description: 'Returns the product of two numbersEquivalent to the `*` operator.'
  }, {
    label: 'NE',
    syntaxParameter: [1, 1],
    syntax: 'NE(value1, value2)',
    description: 'Returns `TRUE` if two specified values are not equal and `FALSE` otherwiseEquivalent to the `<>` operator.'
  }, {
    label: 'POW',
    syntaxParameter: [1, 1],
    syntax: 'POW(base, exponent)',
    description: 'Returns a number raised to a power.'
  }, {
    label: 'UMINUS',
    syntaxParameter: [1],
    syntax: 'UMINUS(value)',
    description: 'Returns a number with the sign reversed.'
  }, {
    label: 'UNARY_PERCENT',
    syntaxParameter: [1],
    syntax: 'UNARY_PERCENT(percentage)',
    description: 'Returns a value interpreted as a percentage; that is, `UNARY_PERCENT(100)` equals `1`.'
  }, {
    label: 'UPLUS',
    syntaxParameter: [1],
    syntax: 'UPLUS(value)',
    description: 'Returns a specified number, unchanged.'
  }, {
    label: 'CONVERT',
    syntaxParameter: [1, 1, 1],
    syntax: 'CONVERT(value, start_unit, end_unit)',
    description: 'Converts a numeric value to a different unit of measure.'
  }, {
    label: 'TO_DATE',
    syntaxParameter: [1],
    syntax: 'TO_DATE(value)',
    description: 'Converts a provided number to a date.'
  }, {
    label: 'TO_DOLLARS',
    syntaxParameter: [1],
    syntax: 'TO_DOLLARS(value)',
    description: 'Converts a provided number to a dollar value.'
  }, {
    label: 'TO_PERCENT',
    syntaxParameter: [1],
    syntax: 'TO_PERCENT(value)',
    description: 'Converts a provided number to a percentage.'
  }, {
    label: 'TO_PURE_NUMBER',
    syntaxParameter: [1],
    syntax: 'TO_PURE_NUMBER(value)',
    description: 'Converts a provided date/time, percentage, currency or other formatted numeric value to a pure number without formatting.'
  }, {
    label: 'TO_TEXT',
    syntaxParameter: [1],
    syntax: 'TO_TEXT(value)',
    description: 'Converts a provided numeric value to a text value.'
  }, {
    label: 'AVEDEV',
    syntaxParameter: [1, 1000],
    syntax: 'AVEDEV(value1, [value2, ...])',
    description: 'Calculates the average of the magnitudes of deviations of data from a dataset\'s mean.'
  }, {
    label: 'AVERAGE',
    syntaxParameter: [1, 1000],
    syntax: 'AVERAGE(value1, [value2, ...])',
    description: 'Returns the numerical average value in a dataset, ignoring text.'
  }, {
    label: 'AVERAGE.WEIGHTED',
    syntaxParameter: [1, 1, 0, 0],
    syntax: 'AVERAGE.WEIGHTED(values, weights, [additional values], [additional weights])',
    description: 'Finds the weighted average of a set of values, given the values and the corresponding weights.'
  }, {
    label: 'AVERAGEA',
    syntaxParameter: [1, 1000],
    syntax: 'AVERAGEA(value1, [value2, ...])',
    description: 'Returns the numerical average value in a dataset.'
  }, {
    label: 'AVERAGEIF',
    syntaxParameter: [1, 1, 0],
    syntax: 'AVERAGEIF(criteria_range, criterion, [average_range])',
    description: 'Returns the average of a range depending on criteria.'
  }, {
    label: 'AVERAGEIFS',
    syntaxParameter: [1, 1, 1, 1000],
    syntax: 'AVERAGEIFS(average_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    description: 'Returns the average of a range depending on multiple criteria.'
  }, {
    label: 'BETA.DIST',
    syntaxParameter: [1, 1, 1, 1, 1],
    syntax: 'BETA.DIST(value, alpha, beta, cumulative, lower_bound, upper_bound)',
    description: 'Returns the probability of a given value as defined by the beta distribution function.'
  }, {
    label: 'BETA.INV',
    syntaxParameter: [1, 1, 1, 1, 1],
    syntax: 'BETA.INV(probability, alpha, beta, lower_bound, upper_bound)',
    description: 'Returns the value of the inverse beta distribution function for a given probability.'
  }, {
    label: 'BETADIST',
    syntaxParameter: [1, 1, 1, 1, 1],
    syntax: 'BETADIST(value, alpha, beta, lower_bound, upper_bound)',
    description: 'SeeBETA.DIST.'
  }, {
    label: 'BETAINV',
    syntaxParameter: [1, 1, 1, 1, 1],
    syntax: 'BETAINV(probability, alpha, beta, lower_bound, upper_bound)',
    description: 'SeeBETA.INV'
  }, {
    label: 'BINOM.DIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'BINOM.DIST(num_successes, num_trials, prob_success, cumulative)',
    description: 'See BINOMDIST '
  }, {
    label: 'BINOM.INV',
    syntaxParameter: [1, 1, 1],
    syntax: 'BINOM.INV(num_trials, prob_success, target_prob)',
    description: 'See CRITBINOM'
  }, {
    label: 'BINOMDIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'BINOMDIST(num_successes, num_trials, prob_success, cumulative)',
    description: 'Calculates the probability of drawing a certain number of successes (or a maximum number of successes) in a certain number of tries given a population of a certain size containing a certain number of successes, with replacement of draws.'
  }, {
    label: 'CHIDIST',
    syntaxParameter: [1, 1],
    syntax: 'CHIDIST(x, degrees_freedom)',
    description: 'Calculates the right-tailed chi-squared distribution, often used in hypothesis testing.'
  }, {
    label: 'CHIINV',
    syntaxParameter: [1, 1],
    syntax: 'CHIINV(probability, degrees_freedom)',
    description: 'Calculates the inverse of the right-tailed chi-squared distribution.'
  }, {
    label: 'CHISQ.DIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'CHISQ.DIST(x, degrees_freedom, cumulative)',
    description: 'Calculates the left-tailed chi-squared distribution, often used in hypothesis testing.'
  }, {
    label: 'CHISQ.DIST.RT',
    syntaxParameter: [1, 1],
    syntax: 'CHISQ.DIST.RT(x, degrees_freedom)',
    description: 'Calculates the right-tailed chi-squared distribution, which is commonly used in hypothesis testing.'
  }, {
    label: 'CHISQ.INV',
    syntaxParameter: [1, 1],
    syntax: 'CHISQ.INV(probability, degrees_freedom)',
    description: 'Calculates the inverse of the left-tailed chi-squared distribution.'
  }, {
    label: 'CHISQ.INV.RT',
    syntaxParameter: [1, 1],
    syntax: 'CHISQ.INV.RT(probability, degrees_freedom)',
    description: 'Calculates the inverse of the right-tailed chi-squared distribution.'
  }, {
    label: 'CHISQ.TEST',
    syntaxParameter: [1, 1],
    syntax: 'CHISQ.TEST(observed_range, expected_range)',
    description: 'See CHITEST'
  }, {
    label: 'CHITEST',
    syntaxParameter: [1, 1],
    syntax: 'CHITEST(observed_range, expected_range)',
    description: 'Returns the probability associated with a Pearson’s chi-squared test on the two ranges of dataDetermines the likelihood that the observed categorical data is drawn from an expected distribution.'
  }, {
    label: 'CONFIDENCE',
    syntaxParameter: [1, 1, 1],
    syntax: 'CONFIDENCE(alpha, standard_deviation, pop_size)',
    description: 'See CONFIDENCE.NORM'
  }, {
    label: 'CONFIDENCE.NORM',
    syntaxParameter: [1, 1, 1],
    syntax: 'CONFIDENCE.NORM(alpha, standard_deviation, pop_size)',
    description: 'Calculates the width of half the confidence interval for a normal distribution.'
  }, {
    label: 'CONFIDENCE.T',
    syntaxParameter: [1, 1, 1],
    syntax: 'CONFIDENCE.T(alpha, standard_deviation, size)',
    description: 'Calculates the width of half the confidence interval for a Student’s t-distribution.'
  }, {
    label: 'CORREL',
    syntaxParameter: [1, 1],
    syntax: 'CORREL(data_y, data_x)',
    description: 'Calculates r, the Pearson product-moment correlation coefficient of a dataset.'
  }, {
    label: 'COUNT',
    syntaxParameter: [1, 1000],
    syntax: 'COUNT(value1, [value2, ...])',
    description: 'Returns a count of the number of numeric values in a dataset.'
  }, {
    label: 'COUNTA',
    syntaxParameter: [1, 1000],
    syntax: 'COUNTA(value1, [value2, ...])',
    description: 'Returns a count of the number of values in a dataset.'
  }, {
    label: 'COVAR',
    syntaxParameter: [1, 1],
    syntax: 'COVAR(data_y, data_x)',
    description: 'Calculates the covariance of a dataset.'
  }, {
    label: 'COVARIANCE.P',
    syntaxParameter: [1, 1],
    syntax: 'COVARIANCE.P(data_y, data_x)',
    description: 'See COVAR'
  }, {
    label: 'COVARIANCE.S',
    syntaxParameter: [1, 1],
    syntax: 'COVARIANCE.S(data_y, data_x)',
    description: 'Calculates the covariance of a dataset, where the dataset is a sample of the total population.'
  }, {
    label: 'CRITBINOM',
    syntaxParameter: [1, 1, 1],
    syntax: 'CRITBINOM(num_trials, prob_success, target_prob)',
    description: 'Calculates the smallest value for which the cumulative binomial distribution is greater than or equal to a specified criteria.'
  }, {
    label: 'DEVSQ',
    syntaxParameter: [1, 1],
    syntax: 'DEVSQ(value1, value2)',
    description: 'Calculates the sum of squares of deviations based on a sample.'
  }, {
    label: 'EXPON.DIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'EXPON.DIST(x, lambda, cumulative)',
    description: 'Returns the value of the exponential distribution function with a specified lambda at a specified value.'
  }, {
    label: 'EXPONDIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'EXPONDIST(x, lambda, cumulative)',
    description: 'SeeEXPON.DIST'
  }, {
    label: 'F.DIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'F.DIST(x, degrees_freedom1, degrees_freedom2, cumulative)',
    description: 'Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input xAlternately called Fisher-Snedecor distribution or Snedecor\'s F distribution.'
  }, {
    label: 'F.DIST.RT',
    syntaxParameter: [1, 1, 1],
    syntax: 'F.DIST.RT(x, degrees_freedom1, degrees_freedom2)',
    description: 'Calculates the right-tailed F probability distribution (degree of diversity) for two data sets with given input xAlternately called Fisher-Snedecor distribution or Snedecor\'s F distribution.'
  }, {
    label: 'F.INV',
    syntaxParameter: [1, 1, 1],
    syntax: 'F.INV(probability, degrees_freedom1, degrees_freedom2)',
    description: 'Calculates the inverse of the left-tailed F probability distributionAlso called the Fisher-Snedecor distribution or Snedecor’s F distribution.'
  }, {
    label: 'F.INV.RT',
    syntaxParameter: [1, 1, 1],
    syntax: 'F.INV.RT(probability, degrees_freedom1, degrees_freedom2)',
    description: 'Calculates the inverse of the right-tailed F probability distributionAlso called the Fisher-Snedecor distribution or Snedecor’s F distribution.'
  }, {
    label: 'F.TEST',
    syntaxParameter: [1, 1],
    syntax: 'F.TEST(range1, range2)',
    description: 'See FTEST.'
  }, {
    label: 'FDIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'FDIST(x, degrees_freedom1, degrees_freedom2)',
    description: 'SeeF.DIST.RT.'
  }, {
    label: 'FINV',
    syntaxParameter: [1, 1, 1],
    syntax: 'FINV(probability, degrees_freedom1, degrees_freedom2)',
    description: 'See F.INV.RT'
  }, {
    label: 'FISHER',
    syntaxParameter: [1],
    syntax: 'FISHER(value)',
    description: 'Returns the Fisher transformation of a specified value.'
  }, {
    label: 'FISHERINV',
    syntaxParameter: [1],
    syntax: 'FISHERINV(value)',
    description: 'Returns the inverse Fisher transformation of a specified value.'
  }, {
    label: 'FORECAST',
    syntaxParameter: [1, 1, 1],
    syntax: 'FORECAST(x, data_y, data_x)',
    description: 'Calculates the expected y-value for a specified x based on a linear regression of a dataset.'
  }, {
    label: 'FORECAST.LINEAR',
    syntaxParameter: [1, 1, 1],
    syntax: 'FORECAST.LINEAR(x, data_y, data_x)',
    description: 'See FORECAST '
  }, {
    label: 'FTEST',
    syntaxParameter: [1, 1],
    syntax: 'FTEST(range1, range2)',
    description: 'Returns the probability associated with an F-test for equality of variancesDetermines whether two samples are likely to have come from populations with the same variance.'
  }, {
    label: 'GAMMA',
    syntaxParameter: [1],
    syntax: 'GAMMA(number)',
    description: 'Returns the Gamma function evaluated at the specified value.'
  }, {
    label: 'GAMMA.DIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'GAMMA.DIST(x, alpha, beta, cumulative)',
    description: 'Calculates the gamma distribution, a two-parameter continuous probability distribution.'
  }, {
    label: 'GAMMA.INV',
    syntaxParameter: [1, 1, 1],
    syntax: 'GAMMA.INV(probability, alpha, beta)',
    description: 'The GAMMA.INV function returns the value of the inverse gamma cumulative distribution function for the specified probability and alpha and beta parameters.'
  }, {
    label: 'GAMMADIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'GAMMADIST(x, alpha, beta, cumulative)',
    description: 'SeeGAMMA.DIST'
  }, {
    label: 'GAMMAINV',
    syntaxParameter: [1, 1, 1],
    syntax: 'GAMMAINV(probability, alpha, beta)',
    description: 'SeeGAMMA.INV.'
  }, {
    label: 'GAUSS',
    syntaxParameter: [1],
    syntax: 'GAUSS(z)',
    description: 'The GAUSS function returns the probability that a random variable, drawn from a normal distribution, will be between the mean and z standard deviations above (or below) the mean.'
  }, {
    label: 'GEOMEAN',
    syntaxParameter: [1, 1],
    syntax: 'GEOMEAN(value1, value2)',
    description: 'Calculates the geometric mean of a dataset.'
  }, {
    label: 'HARMEAN',
    syntaxParameter: [1, 1],
    syntax: 'HARMEAN(value1, value2)',
    description: 'Calculates the harmonic mean of a dataset.'
  }, {
    label: 'HYPGEOM.DIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'HYPGEOM.DIST(num_successes, num_draws, successes_in_pop, pop_size)',
    description: 'See HYPGEOMDIST '
  }, {
    label: 'HYPGEOMDIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'HYPGEOMDIST(num_successes, num_draws, successes_in_pop, pop_size)',
    description: 'Calculates the probability of drawing a certain number of successes in a certain number of tries given a population of a certain size containing a certain number of successes, without replacement of draws.'
  }, {
    label: 'INTERCEPT',
    syntaxParameter: [1, 1],
    syntax: 'INTERCEPT(data_y, data_x)',
    description: 'Calculates the y-value at which the line resulting from linear regression of a dataset will intersect the y-axis (x=0).'
  }, {
    label: 'KURT',
    syntaxParameter: [1, 1],
    syntax: 'KURT(value1, value2)',
    description: 'Calculates the kurtosis of a dataset, which describes the shape, and in particular the "peakedness" of that dataset.'
  }, {
    label: 'LARGE',
    syntaxParameter: [1, 1],
    syntax: 'LARGE(data, n)',
    description: 'Returns the nth largest element from a data set, where n is user-defined.'
  }, {
    label: 'LOGINV',
    syntaxParameter: [1, 1, 1],
    syntax: 'LOGINV(x, mean, standard_deviation)',
    description: 'Returns the value of the inverse log-normal cumulative distribution with given mean and standard deviation at a specified value.'
  }, {
    label: 'LOGNORM.DIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'LOGNORM.DIST(x, mean, standard_deviation)',
    description: 'See LOGNORMDIST'
  }, {
    label: 'LOGNORM.INV',
    syntaxParameter: [1, 1, 1],
    syntax: 'LOGNORM.INV(x, mean, standard_deviation)',
    description: 'See LOGINV'
  }, {
    label: 'LOGNORMDIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'LOGNORMDIST(x, mean, standard_deviation)',
    description: 'Returns the value of the log-normal cumulative distribution with given mean and standard deviation at a specified value.'
  }, {
    label: 'MAX',
    syntaxParameter: [1, 1000],
    syntax: 'MAX(value1, [value2, ...])',
    description: 'Returns the maximum value in a numeric dataset.'
  }, {
    label: 'MAXA',
    syntaxParameter: [1, 1],
    syntax: 'MAXA(value1, value2)',
    description: 'Returns the maximum numeric value in a dataset.'
  }, {
    label: 'MAXIFS',
    syntaxParameter: [1, 1, 1, 0, 1000],
    syntax: 'MAXIFS(range, criteria_range1, criterion1, [criteria_range2, criterion2], …)',
    description: 'Returns the maximum value in a range of cells, filtered by a set of criteria'
  }, {
    label: 'MEDIAN',
    syntaxParameter: [1, 1000],
    syntax: 'MEDIAN(value1, [value2, ...])',
    description: 'Returns the median value in a numeric dataset.'
  }, {
    label: 'MIN',
    syntaxParameter: [1, 1000],
    syntax: 'MIN(value1, [value2, ...])',
    description: 'Returns the minimum value in a numeric dataset.'
  }, {
    label: 'MINA',
    syntaxParameter: [1, 1],
    syntax: 'MINA(value1, value2)',
    description: 'Returns the minimum numeric value in a dataset.'
  }, {
    label: 'MINIFS',
    syntaxParameter: [1, 1, 1, 0, 1000],
    syntax: 'MINIFS(range, criteria_range1, criterion1, [criteria_range2, criterion2], …)',
    description: 'Returns the minimum value in a range of cells, filtered by a set of criteria'
  }, {
    label: 'MODE',
    syntaxParameter: [1, 1000],
    syntax: 'MODE(value1, [value2, ...])',
    description: 'Returns the most commonly occurring value in a dataset.'
  }, {
    label: 'MODE.MULT',
    syntaxParameter: [1, 1],
    syntax: 'MODE.MULT(value1, value2)',
    description: 'Returns the most commonly occurring values in a dataset.'
  }, {
    label: 'MODE.SNGL',
    syntaxParameter: [1, 1000],
    syntax: 'MODE.SNGL(value1, [value2, ...])',
    description: 'See MODE'
  }, {
    label: 'NEGBINOM.DIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'NEGBINOM.DIST(num_failures, num_successes, prob_success)',
    description: 'See NEGBINOMDIST '
  }, {
    label: 'NEGBINOMDIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'NEGBINOMDIST(num_failures, num_successes, prob_success)',
    description: 'Calculates the probability of drawing a certain number of failures before a certain number of successes given a probability of success in independent trials.'
  }, {
    label: 'NORM.DIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'NORM.DIST(x, mean, standard_deviation, cumulative)',
    description: 'See NORMDIST '
  }, {
    label: 'NORM.INV',
    syntaxParameter: [1, 1, 1],
    syntax: 'NORM.INV(x, mean, standard_deviation)',
    description: 'See NORMINV '
  }, {
    label: 'NORM.S.DIST',
    syntaxParameter: [1],
    syntax: 'NORM.S.DIST(x)',
    description: 'See NORMSDIST'
  }, {
    label: 'NORM.S.INV',
    syntaxParameter: [1],
    syntax: 'NORM.S.INV(x)',
    description: 'See NORMSINV'
  }, {
    label: 'NORMDIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'NORMDIST(x, mean, standard_deviation, cumulative)',
    description: 'Returns the value of the normal distribution function (or normal cumulative distribution function) for a specified value, mean, and standard deviation.'
  }, {
    label: 'NORMINV',
    syntaxParameter: [1, 1, 1],
    syntax: 'NORMINV(x, mean, standard_deviation)',
    description: 'Returns the value of the inverse normal distribution function for a specified value, mean, and standard deviation.'
  }, {
    label: 'NORMSDIST',
    syntaxParameter: [1],
    syntax: 'NORMSDIST(x)',
    description: 'Returns the value of the standard normal cumulative distribution function for a specified value.'
  }, {
    label: 'NORMSINV',
    syntaxParameter: [1],
    syntax: 'NORMSINV(x)',
    description: 'Returns the value of the inverse standard normal distribution function for a specified value.'
  }, {
    label: 'PEARSON',
    syntaxParameter: [1, 1],
    syntax: 'PEARSON(data_y, data_x)',
    description: 'Calculates r, the Pearson product-moment correlation coefficient of a dataset.'
  }, {
    label: 'PERCENTILE',
    syntaxParameter: [1, 1],
    syntax: 'PERCENTILE(data, percentile)',
    description: 'Returns the value at a given percentile of a dataset.'
  }, {
    label: 'PERCENTILE.EXC',
    syntaxParameter: [1, 1],
    syntax: 'PERCENTILE.EXC(data, percentile)',
    description: 'Returns the value at a given percentile of a dataset, exclusive of 0 and 1.'
  }, {
    label: 'PERCENTILE.INC',
    syntaxParameter: [1, 1],
    syntax: 'PERCENTILE.INC(data, percentile)',
    description: 'See PERCENTILE'
  }, {
    label: 'PERCENTRANK',
    syntaxParameter: [1, 1, 0],
    syntax: 'PERCENTRANK(data, value, [significant_digits])',
    description: 'Returns the percentage rank (percentile) of a specified value in a dataset.'
  }, {
    label: 'PERCENTRANK.EXC',
    syntaxParameter: [1, 1, 0],
    syntax: 'PERCENTRANK.EXC(data, value, [significant_digits])',
    description: 'Returns the percentage rank (percentile) from 0 to 1 exclusive of a specified value in a dataset.'
  }, {
    label: 'PERCENTRANK.INC',
    syntaxParameter: [1, 1, 0],
    syntax: 'PERCENTRANK.INC(data, value, [significant_digits])',
    description: 'Returns the percentage rank (percentile) from 0 to 1 inclusive of a specified value in a dataset.'
  }, {
    label: 'PERMUTATIONA',
    syntaxParameter: [1, 1],
    syntax: 'PERMUTATIONA(number, number_chosen)',
    description: 'Returns the number of permutations for selecting a group of objects (with replacement) from a total number of objects.'
  }, {
    label: 'PERMUT',
    syntaxParameter: [1, 1],
    syntax: 'PERMUT(n, k)',
    description: 'Returns the number of ways to choose some number of objects from a pool of a given size of objects, considering order.'
  }, {
    label: 'PHI',
    syntaxParameter: [1],
    syntax: 'PHI(x)',
    description: 'The PHI function returns the value of the normal distribution with mean 0 and standard deviation 1.'
  }, {
    label: 'POISSON',
    syntaxParameter: [1, 1, 1],
    syntax: 'POISSON(x, mean, cumulative)',
    description: 'SeePOISSON.DIST'
  }, {
    label: 'POISSON.DIST',
    syntaxParameter: [1, 1, 0],
    syntax: 'POISSON.DIST(x, mean, [cumulative])',
    description: 'Returns the value of the Poisson distribution function (or Poisson cumulative distribution function) for a specified value and mean.'
  }, {
    label: 'PROB',
    syntaxParameter: [1, 1, 1, 0],
    syntax: 'PROB(data, probabilities, low_limit, [high_limit])',
    description: 'Given a set of values and corresponding probabilities, calculates the probability that a value chosen at random falls between two limits.'
  }, {
    label: 'QUARTILE',
    syntaxParameter: [1, 1],
    syntax: 'QUARTILE(data, quartile_number)',
    description: 'Returns a value nearest to a specified quartile of a dataset.'
  }, {
    label: 'QUARTILE.EXC',
    syntaxParameter: [1, 1],
    syntax: 'QUARTILE.EXC(data, quartile_number)',
    description: 'Returns value nearest to a given quartile of a dataset, exclusive of 0 and 4.'
  }, {
    label: 'QUARTILE.INC',
    syntaxParameter: [1, 1],
    syntax: 'QUARTILE.INC(data, quartile_number)',
    description: 'See QUARTILE'
  }, {
    label: 'RANK',
    syntaxParameter: [1, 1, 0],
    syntax: 'RANK(value, data, [is_ascending])',
    description: 'Returns the rank of a specified value in a dataset.'
  }, {
    label: 'RANK.AVG',
    syntaxParameter: [1, 1, 0],
    syntax: 'RANK.AVG(value, data, [is_ascending])',
    description: 'Returns the rank of a specified value in a datasetIf there is more than one entry of the same value in the dataset, the average rank of the entries will be returned.'
  }, {
    label: 'RANK.EQ',
    syntaxParameter: [1, 1, 0],
    syntax: 'RANK.EQ(value, data, [is_ascending])',
    description: 'Returns the rank of a specified value in a datasetIf there is more than one entry of the same value in the dataset, the top rank of the entries will be returned.'
  }, {
    label: 'RSQ',
    syntaxParameter: [1, 1],
    syntax: 'RSQ(data_y, data_x)',
    description: 'Calculates the square of r, the Pearson product-moment correlation coefficient of a dataset.'
  }, {
    label: 'SKEW',
    syntaxParameter: [1, 1],
    syntax: 'SKEW(value1, value2)',
    description: 'Calculates the skewness of a dataset, which describes the symmetry of that dataset about the mean.'
  }, {
    label: 'SKEW.P',
    syntaxParameter: [1, 1],
    syntax: 'SKEW.P(value1, value2)',
    description: 'Calculates the skewness of a dataset that represents the entire population.'
  }, {
    label: 'SLOPE',
    syntaxParameter: [1, 1],
    syntax: 'SLOPE(data_y, data_x)',
    description: 'Calculates the slope of the line resulting from linear regression of a dataset.'
  }, {
    label: 'SMALL',
    syntaxParameter: [1, 1],
    syntax: 'SMALL(data, n)',
    description: 'Returns the nth smallest element from a data set, where n is user-defined.'
  }, {
    label: 'STANDARDIZE',
    syntaxParameter: [1, 1, 1],
    syntax: 'STANDARDIZE(value, mean, standard_deviation)',
    description: 'Calculates the normalized equivalent of a random variable given mean and standard deviation of the distribution.'
  }, {
    label: 'STDEV',
    syntaxParameter: [1, 1000],
    syntax: 'STDEV(value1, [value2, ...])',
    description: 'Calculates the standard deviation based on a sample.'
  }, {
    label: 'STDEV.P',
    syntaxParameter: [1, 1000],
    syntax: 'STDEV.P(value1, [value2, ...])',
    description: 'See STDEVP'
  }, {
    label: 'STDEV.S',
    syntaxParameter: [1, 1000],
    syntax: 'STDEV.S(value1, [value2, ...])',
    description: 'See STDEV'
  }, {
    label: 'STDEVA',
    syntaxParameter: [1, 1],
    syntax: 'STDEVA(value1, value2)',
    description: 'Calculates the standard deviation based on a sample, setting text to the value `0`.'
  }, {
    label: 'STDEVP',
    syntaxParameter: [1, 1],
    syntax: 'STDEVP(value1, value2)',
    description: 'Calculates the standard deviation based on an entire population.'
  }, {
    label: 'STDEVPA',
    syntaxParameter: [1, 1],
    syntax: 'STDEVPA(value1, value2)',
    description: 'Calculates the standard deviation based on an entire population, setting text to the value `0`.'
  }, {
    label: 'STEYX',
    syntaxParameter: [1, 1],
    syntax: 'STEYX(data_y, data_x)',
    description: 'Calculates the standard error of the predicted y-value for each x in the regression of a dataset.'
  }, {
    label: 'T.DIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'T.DIST(x, degrees_freedom, cumulative)',
    description: 'Returns the right tailed Student distribution for a value x.'
  }, {
    label: 'T.DIST.2T',
    syntaxParameter: [1, 1],
    syntax: 'T.DIST.2T(x, degrees_freedom)',
    description: 'Returns the two tailed Student distribution for a value x.'
  }, {
    label: 'T.DIST.RT',
    syntaxParameter: [1, 1],
    syntax: 'T.DIST.RT(x, degrees_freedom)',
    description: 'Returns the right tailed Student distribution for a value x.'
  }, {
    label: 'T.INV',
    syntaxParameter: [1, 1],
    syntax: 'T.INV(probability, degrees_freedom)',
    description: 'Calculates the negative inverse of the one-tailed TDIST function.'
  }, {
    label: 'T.INV.2T',
    syntaxParameter: [1, 1],
    syntax: 'T.INV.2T(probability, degrees_freedom)',
    description: 'Calculates the inverse of the two-tailed TDIST function.'
  }, {
    label: 'T.TEST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'T.TEST(range1, range2, tails, type)',
    description: 'Returns the probability associated with Student\'s t-testDetermines whether two samples are likely to have come from the same two underlying populations that have the same mean.'
  }, {
    label: 'TDIST',
    syntaxParameter: [1, 1, 1],
    syntax: 'TDIST(x, degrees_freedom, tails)',
    description: 'Calculates the probability for Student\'s t-distribution with a given input (x).'
  }, {
    label: 'TINV',
    syntaxParameter: [1, 1],
    syntax: 'TINV(probability, degrees_freedom)',
    description: 'See T.INV.2T'
  }, {
    label: 'TRIMMEAN',
    syntaxParameter: [1, 1],
    syntax: 'TRIMMEAN(data, exclude_proportion)',
    description: 'Calculates the mean of a dataset excluding some proportion of data from the high and low ends of the dataset.'
  }, {
    label: 'TTEST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'TTEST(range1, range2, tails, type)',
    description: 'SeeT.TEST.'
  }, {
    label: 'VAR',
    syntaxParameter: [1, 1000],
    syntax: 'VAR(value1, [value2, ...])',
    description: 'Calculates the variance based on a sample.'
  }, {
    label: 'VAR.P',
    syntaxParameter: [1, 1000],
    syntax: 'VAR.P(value1, [value2, ...])', description: 'See VARP'
  }, {
    label: 'VAR.S',
    syntaxParameter: [1, 1000],
    syntax: 'VAR.S(value1, [value2, ...])', description: 'See VAR'
  }, {
    label: 'VARA',
    syntaxParameter: [1, 1],
    syntax: 'VARA(value1, value2)',
    description: 'Calculates an estimate of variance based on a sample, setting text to the value `0`.'
  }, {
    label: 'VARP',
    syntaxParameter: [1, 1],
    syntax: 'VARP(value1, value2)',
    description: 'Calculates the variance based on an entire population.'
  }, {
    label: 'VARPA',
    syntaxParameter: [1, 1, 1000],
    syntax: 'VARPA(value1, value2,...)',
    description: 'Calculates the variance based on an entire population, setting text to the value `0`.'
  }, {
    label: 'WEIBULL',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'WEIBULL(x, shape, scale, cumulative)',
    description: 'Returns the value of the Weibull distribution function (or Weibull cumulative distribution function) for a specified shape and scale.'
  }, {
    label: 'WEIBULL.DIST',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'WEIBULL.DIST(x, shape, scale, cumulative)',
    description: 'See WEIBULL'
  }, {
    label: 'Z.TEST',
    syntaxParameter: [1, 1, 0],
    syntax: 'Z.TEST(data, value, [standard_deviation])',
    description: 'Returns the one-tailed P-value of a Z-test with standard distribution.'
  }, {
    label: 'ZTEST',
    syntaxParameter: [1, 1, 0],
    syntax: 'ZTEST(data, value, [standard_deviation])',
    description: 'SeeZ.TEST.'
  }, {
    label: 'ARABIC',
    syntaxParameter: [1],
    syntax: 'ARABIC(roman_numeral)',
    description: 'Computes the value of a Roman numeral.'
  }, {
    label: 'ASC',
    syntaxParameter: [1],
    syntax: 'ASC(text)',
    description: 'Converts full-width ASCII and katakana characters to their half-width counterpartsAll standard-width characters will remain unchanged.'
  }, {
    label: 'CHAR',
    syntaxParameter: [1],
    syntax: 'CHAR(table_number)',
    description: 'Convert a number into a character according to the current Unicode table.'
  }, {
    label: 'CLEAN',
    syntaxParameter: [1],
    syntax: 'CLEAN(text)',
    description: 'Returns the text with the non-printable ASCII characters removed.'
  }, {
    label: 'CODE',
    syntaxParameter: [1],
    syntax: 'CODE(string)',
    description: 'Returns the numeric Unicode map value of the first character in the string provided.'
  }, {
    label: 'CONCATENATE',
    syntaxParameter: [1, 1000],
    syntax: 'CONCATENATE(string1, [string2, ...])',
    description: 'Appends strings to one another.'
  }, {
    label: 'DOLLAR',
    syntaxParameter: [1, 0],
    syntax: 'DOLLAR(number, [number_of_places])',
    description: 'Formats a number into the locale-specific currency format.'
  }, {
    label: 'EXACT',
    syntaxParameter: [1, 1],
    syntax: 'EXACT(string1, string2)',
    description: 'Tests whether two strings are identical.'
  }, {
    label: 'FIND',
    syntaxParameter: [1, 1, 0],
    syntax: 'FIND(search_for, text_to_search, [starting_at])',
    description: 'Returns the position at which a string is first found within text.'
  }, {
    label: 'FINDB',
    syntaxParameter: [1, 1, 0],
    syntax: 'FINDB(search_for, text_to_search, [starting_at])',
    description: 'Returns the position at which a string is first found within text counting each double-character as 2.'
  }, {
    label: 'FIXED',
    syntaxParameter: [1, 0, 0],
    syntax: 'FIXED(number, [number_of_places], [suppress_separator])',
    description: 'Formats a number with a fixed number of decimal places.'
  }, {
    label: 'JOIN',
    syntaxParameter: [1, 1, 999],
    syntax: 'JOIN(delimiter, value_or_array1, [value_or_array2, ...])',
    description: 'Concatenates the elements of one or more one-dimensional arrays using a specified delimiter.'
  }, {
    label: 'LEFT',
    syntaxParameter: [1, 0],
    syntax: 'LEFT(string, [number_of_characters])',
    description: 'Returns a substring from the beginning of a specified string.'
  }, {
    label: 'LEFTB',
    syntaxParameter: [1, 1],
    syntax: 'LEFTB(string, num_of_bytes)',
    description: 'Returns the left portion of a string up to a certain number of bytes.'
  }, {
    label: 'LEN',
    syntaxParameter: [1],
    syntax: 'LEN(text)',
    description: 'Returns the length of a string.'
  }, {
    label: 'LENB',
    syntaxParameter: [1],
    syntax: 'LENB(string)',
    description: 'Returns the length of a string in bytes.".'
  }, {
    label: 'LOWER',
    syntaxParameter: [1],
    syntax: 'LOWER(text)',
    description: 'Converts a specified string to lowercase.'
  }, {
    label: 'MID',
    syntaxParameter: [1, 1, 1],
    syntax: 'MID(string, starting_at, extract_length)',
    description: 'Returns a segment of a string.'
  }, {
    label: 'MIDB',
    syntaxParameter: [1],
    syntax: 'MIDB(string)',
    description: 'Returns a section of a string starting at a given character and up to a specified number of bytes.'
  }, {
    label: 'PROPER',
    syntaxParameter: [1],
    syntax: 'PROPER(text_to_capitalize)',
    description: 'Capitalizes each word in a specified string.'
  }, {
    label: 'REGEXEXTRACT',
    syntaxParameter: [1, 1],
    syntax: 'REGEXEXTRACT(text, regular_expression)',
    description: 'Extracts matching substrings according to a regular expression.'
  }, {
    label: 'REGEXMATCH',
    syntaxParameter: [1, 1],
    syntax: 'REGEXMATCH(text, regular_expression)',
    description: 'Whether a piece of text matches a regular expression.'
  }, {
    label: 'REGEXREPLACE',
    syntaxParameter: [1, 1, 1],
    syntax: 'REGEXREPLACE(text, regular_expression, replacement)',
    description: 'Replaces part of a text string with a different text string using regular expressions.'
  }, {
    label: 'REPLACE',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'REPLACE(text, position, length, new_text)',
    description: 'Replaces part of a text string with a different text string.'
  }, {
    label: 'REPLACEB',
    syntaxParameter: [1, 1, 1, 1],
    syntax: 'REPLACEB(text, position, num_bytes, new_text)',
    description: 'Replaces part of a text string, based on a number of bytes, with a different text string.'
  }, {
    label: 'REPT',
    syntaxParameter: [1, 1],
    syntax: 'REPT(text_to_repeat, number_of_repetitions)',
    description: 'Returns specified text repeated a number of times.'
  }, {
    label: 'RIGHT',
    syntaxParameter: [1, 0],
    syntax: 'RIGHT(string, [number_of_characters])',
    description: 'Returns a substring from the end of a specified string.'
  }, {
    label: 'RIGHTB',
    syntaxParameter: [1, 1],
    syntax: 'RIGHTB(string, num_of_bytes)',
    description: 'Returns the right portion of a string up to a certain number of bytes.'
  }, {
    label: 'ROMAN',
    syntaxParameter: [1, 0],
    syntax: 'ROMAN(number, [rule_relaxation])',
    description: 'Formats a number in Roman numerals.'
  }, {
    label: 'SEARCH',
    syntaxParameter: [1, 1, 0],
    syntax: 'SEARCH(search_for, text_to_search, [starting_at])',
    description: 'Returns the position at which a string is first found within text.'
  }, {
    label: 'SEARCHB',
    syntaxParameter: [1, 1, 0],
    syntax: 'SEARCHB(search_for, text_to_search, [starting_at])',
    description: 'Returns the position at which a string is first found within text counting each double-character as 2.'
  }, {
    label: 'SPLIT',
    syntaxParameter: [1, 1, 0, 0],
    syntax: 'SPLIT(text, delimiter, [split_by_each], [remove_empty_text])',
    description: 'Divides text around a specified character or string, and puts each fragment into a separate cell in the row.'
  }, {
    label: 'SUBSTITUTE',
    syntaxParameter: [1, 1, 1, 0],
    syntax: 'SUBSTITUTE(text_to_search, search_for, replace_with, [occurrence_number])',
    description: 'Replaces existing text with new text in a string.'
  }, {
    label: 'T',
    syntaxParameter: [1],
    syntax: 'T(value)',
    description: 'Returns string arguments as text.'
  }, {
    label: 'TEXT',
    syntaxParameter: [1, 1],
    syntax: 'TEXT(number, format)',
    description: 'Converts a number into text according to a specified format.'
  }, {
    label: 'TEXTJOIN',
    syntaxParameter: [1, 1, 1, 0, -1],
    syntax: 'TEXTJOIN(delimiter, ignore_empty, text1, [text2], …)',
    description: 'Combines the text from multiple strings and/or arrays, with a specifiable delimiter separating the different texts'
  }, {
    label: 'TRIM',
    syntaxParameter: [1],
    syntax: 'TRIM(text)',
    description: 'Removes leading and trailing spaces in a specified string.'
  }, {
    label: 'UNICHAR',
    syntaxParameter: [1],
    syntax: 'UNICHAR(number)',
    description: 'Returns the Unicode character for a number.'
  }, {
    label: 'UNICODE',
    syntaxParameter: [1],
    syntax: 'UNICODE(text)',
    description: 'Returns the decimal Unicode value of the first character of the text.'
  }, {
    label: 'UPPER',
    syntaxParameter: [1],
    syntax: 'UPPER(text)',
    description: 'Converts a specified string to uppercase.'
  }, {
    label: 'VALUE',
    syntaxParameter: [1],
    syntax: 'VALUE(text)',
    description: 'Converts a string in any of the date, time or number formats that Google Sheets understands into a number.'
  }, {
    label: 'ENCODEURL',
    syntaxParameter: [1],
    syntax: 'ENCODEURL(text)',
    description: 'Encodes a string of text for the purpose of using in a URL query.'
  }, {
    label: 'HYPERLINK',
    syntaxParameter: [1, 0],
    syntax: 'HYPERLINK(url, [link,label])',
    description: 'Creates a hyperlink inside a cell.'
  }, {
    label: 'IMPORTDATA',
    syntaxParameter: [1],
    syntax: 'IMPORTDATA(url)',
    description: 'Imports data at a given url in .csv (comma-separated value) or .tsv (tab-separated value) format.'
  }, {
    label: 'IMPORTFEED',
    syntaxParameter: [1, 0, 0, 0],
    syntax: 'IMPORTFEED(url, [query], [headers], [num_items])',
    description: 'Imports a RSS or ATOM feed.'
  }, {
    label: 'IMPORTHTML',
    syntaxParameter: [1, 1, 1],
    syntax: 'IMPORTHTML(url, query, index)',
    description: 'Imports data from a table or list within an HTML page.'
  }, {
    label: 'IMPORTRANGE',
    syntaxParameter: [1, 1],
    syntax: 'IMPORTRANGE(spreadsheet_url, range_string)',
    description: 'Imports a range of cells from a specified spreadsheet.'
  }, {
    label: 'IMPORTXML',
    syntaxParameter: [1, 1],
    syntax: 'IMPORTXML(url, xpath_query)',
    description: 'Imports data from any of various structured data types including XML, HTML, CSV, TSV, and RSS and ATOM XML feeds.'
  }, {
    label: 'ISURL',
    syntaxParameter: [1],
    syntax: 'ISURL(value)',
    description: 'Checks whether a value is a valid URL.'
  }
];
