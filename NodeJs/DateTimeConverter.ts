class DateTimeConverter {
  /**
   * Converts a string to a Date object.
   * @param {string} dateString - The string to convert to a Date object.
   * @returns {Date|null} The Date object or null if conversion fails.
   */
  static convertStringToDate(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return date;
    } catch (error) {
      console.error("Error converting string to date:", error.message);
      return null;
    }
  }

  /**
   * Gets the starting date of the current quarter.
   * @returns {Date} The starting date of the current quarter.
   */
  static getCurrentQuarterStartDate() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
    return new Date(now.getFullYear(), quarterStartMonth, 1);
  }

  /**
   * Gets the last day of a specified quarter.
   * @param {number} quarter - The quarter number (1-4).
   * @param {number} year - The year for which to get the last day of the quarter.
   * @returns {Date} The last day of the specified quarter.
   */
  static getLastDayOfQuarter(quarter, year = new Date().getFullYear()) {
    const quarterEndMonths = [2, 5, 8, 11]; // March, June, September, December
    const lastMonthOfQuarter = quarterEndMonths[quarter - 1];
    const lastDay = new Date(year, lastMonthOfQuarter + 1, 0); // Last day of the quarter month
    return lastDay;
  }

  /**
   * Gets the first day of the current week (Monday).
   * @returns {Date} The first day of the current week.
   */
  static getCurrentWeekStartDate() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = (dayOfWeek + 6) % 7; // Calculate difference to get to Monday
    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setDate(now.getDate() - diffToMonday);
    return firstDayOfWeek;
  }

  /**
   * Gets the last day of the current week (Sunday).
   * @returns {Date} The last day of the current week.
   */
  static getLastDayOfWeek() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToSunday = 6 - dayOfWeek; // Calculate difference to get to Sunday
    const lastDayOfWeek = new Date(now);
    lastDayOfWeek.setDate(now.getDate() + diffToSunday);
    return lastDayOfWeek;
  }
}

// Example usage:
console.log("Converted Date:", DateTimeConverter.convertStringToDate("2024-08-11T10:30:00"));
console.log("Current Q1 Starting Date:", DateTimeConverter.getCurrentQuarterStartDate());
console.log("Last Day of Q2:", DateTimeConverter.getLastDayOfQuarter(2));
console.log("Current First Day of the Week:", DateTimeConverter.getCurrentWeekStartDate());
console.log("Last Day of This Week:", DateTimeConverter.getLastDayOfWeek());
