class DateTimeConverter {
  /**
   * Converts a string to a Date object.
   * @param {string} dateString - The string to convert to a Date object.
   * @returns {Date|null} The Date object or null if conversion fails.
   */
  static ConvertStringToDate(dateString: string): Date | null {
    try {
      let date = new Date(dateString);
  	  if (isNaN(date.getTime())) {
  		dateString = dateString.toLowerCase();
  	    let currentdate = new Date();
        const currentMonthIndex = currentdate.getMonth(); // 0 for January, 11 for December
  			
  		switch(dateString)
  		{
  			case "sysdate":
  			case "sys date":
  			case "systemdate":
  			case "system date":
  			case "currentdatetime":
  			case "current datetime":
  			case "currenttime":
  			case "current time":
  			case "current":
  			case "currentdate":
  			case "date":
  			case "datetime":
  			case "time":
  			case "now":
  				date = new Date();
  				break;
  			case "current date":
  			case "currentdate":
  			case "today":
  				date = new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate(), 0, 0, 0, 0);
  				break;
  			case "tomorrow":
  			case "tomorow":
                  let now = new Date();
                  const tomorrow = new Date(now); // Create a new Date object based on the current date
                  tomorrow.setDate(now.getDate() + 1); // Add one day to the current date
  				date = tomorrow;
  				break;
  			case "currentquarterstartdate":
  			case "current quarter start date":
  			case "quarterstartdate":
  			case "quarter start date":
  				const currentQuarter = Math.floor(currentMonthIndex / 3) + 1;
  				date = this.GetQuarterStartDate(currentQuarter);
  				break;
  			case "nextquarterstartdate":
  			case "next quarter start date":
  			case "nextquarterstartdatetime":
  			case "next quarter start date time":
  				const nextQuarter = Math.floor(currentMonthIndex / 3) + 2;
  				date = this.GetQuarterStartDate(nextQuarter);
  				break;
  			case "currentweekstartdate":
  			case "current week start date":
  			case "weekstartdate":
  			case "week start date":
  			case "currentweek":
  			case "current week":
  				date = this.GetCurrentWeekStartDate();
  				break;
  			case "currentlastdayofweek":
  			case "current last day of week":
  			case "lastdayofweek":
  			case "last day of week":
  			case "lastdaycurrentweek":
  			case "lastdayofweek":
  			case "last day of week":
  				date = this.GetLastDayOfWeek();
  				break;
  			case "currentyearstartdate":
  			case "current year start date":
  			case "yearstartdate":
  			case "year start date":
  				date = this.GetYearStartDate(currentdate.getFullYear());
  				break;
  			case "nextyearstartdate":
  			case "next year start date":
  				date = this.GetYearStartDate(currentdate.getFullYear() + 1);
  				break;
  		}
  	  }
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return date;
    } catch (error:any) {
      console.error("Error converting string to date:", error.message);
      return null;
    }
  }

  /**
   * Gets the starting date of the current quarter.
   * @returns {Date} The starting date of the current quarter.
   */
  static GetQuarterStartDate(quarter:number, year:number = new Date().getFullYear()):Date {
    const quarterEndMonths = [2, 5, 8, 11]; // March, June, September, December
    const quarterStartMonth = quarterEndMonths[quarter - 2];
    return new Date(year, quarterStartMonth, 1);
  }

  /**
   * Gets the last day of a specified quarter.
   * @param {number} quarter - The quarter number (1-4).
   * @param {number} year - The year for which to get the last day of the quarter.
   * @returns {Date} The last day of the specified quarter.
   */
  static GetQuarterLastDay(quarter:number, year:number = new Date().getFullYear()):Date {
    const quarterEndMonths = [2, 5, 8, 11]; // March, June, September, December
    const lastMonthOfQuarter = quarterEndMonths[quarter - 1];
    const lastDay = new Date(year, lastMonthOfQuarter + 1, 0); // Last day of the quarter month
    return lastDay;
  }

  /**
   * Gets the first day of the current week (Monday).
   * @returns {Date} The first day of the current week.
   */
  static GetCurrentWeekStartDate():Date {
    const currentdate = new Date();
    const dayOfWeek = currentdate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = (dayOfWeek + 6) % 7; // Calculate difference to get to Monday
    const firstDayOfWeek = new Date(currentdate);
    firstDayOfWeek.setDate(currentdate.getDate() - diffToMonday);
    return firstDayOfWeek;
  }

  /**
   * Gets the last day of the current week (Sunday).
   * @returns {Date} The last day of the current week.
   */
  static GetLastDayOfWeek():Date {
    const currentdate = new Date();
    const dayOfWeek = currentdate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToSunday = 6 - dayOfWeek; // Calculate difference to get to Sunday
    const lastDayOfWeek = new Date(currentdate);
    lastDayOfWeek.setDate(currentdate.getDate() + diffToSunday);
    return lastDayOfWeek;
  }
  
  /**
   * Gets the start day of a specified year.
   * @param {number} year - The year for which to get the last day of the quarter.
   * @returns {Date} The start day of the specified year.
   */
  static GetYearStartDate(year:number = new Date().getFullYear()):Date {
    const startOfYear = new Date(year, 0, 1); // January is month 0
    return startOfYear;
  }
}

// Example usage:
console.log("Converted Date:", DateTimeConverter.ConvertStringToDate("2024-08-11T10:30:00"));
console.log("Current Q1 Starting Date:", DateTimeConverter.GetQuarterStartDate(1));
console.log("Last Day of Q2:", DateTimeConverter.GetQuarterLastDay(2));
console.log("Current First Day of the Week:", DateTimeConverter.GetCurrentWeekStartDate());
console.log("Last Day of This Week:", DateTimeConverter.GetLastDayOfWeek());
