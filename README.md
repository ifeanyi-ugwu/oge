# OGE

OGE is a utility package designed to prevent servers, especially free instances on hosting platforms like render.com, from going dormant due to inactivity. It offers configurable sleep windows, time zones, and additional utilities for building custom functionalities.

[![npm version](https://badge.fury.io/js/oge.svg)](https://badge.fury.io/js/oge)

## Installation

### npm

```bash
npm install oge
```

### yarn

```bash
yarn add oge
```

## Usage

### Importing the Utility

```javascript
import { sleepGuard } from "oge";
```

### Available Utilities

#### `sleepGuard`

Prevents server dormancy by pinging a specified URL at regular intervals.

```javascript
sleepGuard(config: {url: string, intervalMinutes?: number = 14, sleepStart?: string, sleepEnd?: string, timeZone?: string = 'UTC'}): { start: () => void, stop: () => void };
```

- `config.url`: The URL to ping. This is public the url of your server instance.
- `config.intervalMinutes` (optional): Interval in minutes between pings.
- `config.sleepStart` (optional): Start time of the sleep window in 'HH:MM:SS:MS' format.
- `config.sleepEnd` (optional): End time of the sleep window in 'HH:MM:SS:MS' format.
- `config.timeZone` (optional): The standard time zone.

Free hosting providers often limit your server uptime. With `sleepStart` and `sleepEnd`, you can schedule your server to stay awake only when it is likely to be used .

**Example:**

```javascript
const pinger = sleepGuard({
  url: "https://example.com",
  intervalMinutes: 10,
  sleepStart: "22:00",
  sleepEnd: "06:00",
  timeZone: "America/New_York",
});

pinger.start();
```

#### `isTimeWithinInterval`

Checks if the specified time is within a given interval.

```javascript
isTimeWithinInterval(timeToCheck: Date,interval: {start: Date, end: Date}): boolean;
```

**Example:**

```javascript
const result = isTimeWithinInterval(new Date(), {
  start: new Date(),
  end: new Date(),
});
```

#### `parseTimeStringToUTCDate`

Parses a time string to a UTC date object.

```javascript
parseTimeStringToUTCDate(timeString: string, timeZone: string): Date;
```

**Example:**

```javascript
const date = parseTimeStringToUTCDate("22:00", "America/New_York");
```

#### `getUTCOffset`

Returns the UTC offset for the specified time zone.

```javascript
getUTCOffset(timeZone: string): string;
```

**Example:**

```javascript
const offset = getUTCOffset("America/New_York");
```

#### `getUTCOffsetInHours`

Returns the UTC offset in hours for the specified time zone.

```javascript
getUTCOffsetInHours(timeZone: string): number;
```

**Example:**

```javascript
const offsetInHours = getUTCOffsetInHours("America/New_York");
```

#### `getCurrentTimeInTimeZone`

Returns the current time in the specified time zone.

```javascript
getCurrentTimeInTimeZone(timezone: string): string;
```

**Example:**

```javascript
const currentTime = getCurrentTimeInTimeZone("America/New_York");
```

#### `pingUrl`

Pings a URL by sending a fetch request.

```javascript
pingUrl(url: string): Promise<void>;
```

**Example:**

```javascript
pingUrl("https://example.com");
```

## Contributing

Want to make OGE even better? Fork the repository and submit a pull request to contribute.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
