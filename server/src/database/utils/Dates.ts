export default class Dates {
  // Returns current date & time in UTC (ISO format)
  static getDate() {
    const serverTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Get local datetime in server timezone
    const localDateTimeString = new Date().toLocaleString("en-US", {
      timeZone: serverTimezone,
    });

    // Convert that local time into a Date object and output as UTC ISO
    const utcDateTime = new Date(localDateTimeString).toISOString();

    return utcDateTime;
  }

  // Returns date only (MM/DD/YYYY) in server timezone
  static getTimeZoneDate() {
    const serverTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options: Intl.DateTimeFormatOptions = {
      timeZone: serverTimezone,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    const currentDate = new Date().toLocaleDateString("en-US", options);

    return currentDate;
  }
}
