import calendarJsonRaw from '../../calendardata.json';

export interface CalendarEvent {
    date: string; // ISO format or YYYY-MM-DD
    title: string;
    type: 'festival' | 'vrat' | 'jayanti' | 'other';
    description: string;
    marathiTithi: string;
    importance?: 'high' | 'medium' | 'low';
}

// Helper to format date "YYYY-MM-DD"
const getDateStr = (year: number, month: number, day: number) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Simplified mapping for a few prominent 2025/2026 dates
// Forced Vite Cache Eviction Update
// In a full production app, this is heavily algorithm-dependent based on moon phases.
const getFestType = (jsonType: string): 'festival' | 'vrat' | 'jayanti' | 'other' => {
   const t = (jsonType || '').toLowerCase();
   if (t === 'festival') return 'festival';
   if (t === 'jayanti') return 'jayanti';
   if (['ekadashi', 'pradosh', 'amavasya', 'purnima'].includes(t)) return 'vrat';
   return 'other';
};

export const festivalDataMap: Record<string, CalendarEvent[]> = {};

// Safely parse user JSON file into CalendarEvent schema dynamically
try {
  const jsonData = calendarJsonRaw as any;
  if (jsonData && jsonData.months) {
    Object.values(jsonData.months).forEach((monthData: any) => {
      Object.entries(monthData).forEach(([dateStr, festivals]: [string, any]) => {
        if (Array.isArray(festivals) && festivals.length > 0) {
          festivalDataMap[dateStr] = festivals.map((fest: any) => {
            let marathiStr = fest.name_mr || fest.name;
            if (fest.tithi_mr && fest.name_mr !== fest.tithi_mr) {
              marathiStr += ` (${fest.tithi_mr})`;
            }
            return {
               date: dateStr,
               title: fest.name_en || fest.name || 'Event',
               type: getFestType(fest.type),
               description: `${fest.name_en || fest.name} observation.`,
               marathiTithi: marathiStr || fest.type || 'Panchang',
               importance: 'high'
            };
          });
        }
      });
    });
  }
} catch (e) {
  console.error("Failed to parse calendardata.json", e);
}

export const marathiMonths = [
    "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
    "Ashvin", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna"
];

// Faking the algorithm to get Marathi month based on Gregorian (Rough approximation for UI mapping)
export const getMarathiMonthFromGregorian = (date: Date) => {
    const month = date.getMonth(); // 0-11
    // Roughly mapping Gregorian to Hindu months (offset varies yearly)
    // Jan~Feb -> Magha/Phalguna
    // Mar~Apr -> Chaitra/Vaishakha
    const roughMap = [
        "Pausha / Magha",      // 0 - Jan
        "Magha / Phalguna",    // 1 - Feb
        "Phalguna / Chaitra",  // 2 - Mar
        "Chaitra / Vaishakha", // 3 - Apr
        "Vaishakha / Jyeshtha",// 4 - May
        "Jyeshtha / Ashadha",  // 5 - Jun
        "Ashadha / Shravana",  // 6 - Jul
        "Shravana / Bhadrapada", // 7 - Aug
        "Bhadrapada / Ashvin", // 8 - Sep
        "Ashvin / Kartika",    // 9 - Oct
        "Kartika / Margashirsha", // 10 - Nov
        "Margashirsha / Pausha" // 11 - Dec
    ];
    return roughMap[month];
};

// Generates calendar blocks for the UI month grid
export const generateCalendarGrid = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay(); // 0 relative to Sunday

    const totalDays = lastDay.getDate();
    const days = [];

    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        days.push({
            date: new Date(year, month - 1, prevMonthLastDay - i),
            isCurrentMonth: false,
            dayNumber: prevMonthLastDay - i
        });
    }

    // Current month
    for (let i = 1; i <= totalDays; i++) {
        days.push({
            date: new Date(year, month, i),
            isCurrentMonth: true,
            dayNumber: i
        });
    }

    // Next month padding (to fill a 35 grid layout, or 42 layout)
    const remainingDays = 35 - days.length >= 0 ? 35 - days.length : 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
        days.push({
            date: new Date(year, month + 1, i),
            isCurrentMonth: false,
            dayNumber: i
        });
    }

    return days;
};
