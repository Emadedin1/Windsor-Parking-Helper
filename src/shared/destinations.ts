export interface Destination {
  name: string;
  latitude: number;
  longitude: number;
}

export const destinations: Destination[] = [
  {
    name: 'Downtown Windsor',
    latitude: 42.3131,
    longitude: -83.0364
  },
  {
    name: 'Caesars Windsor',
    latitude: 42.3177,
    longitude: -83.0338
  },
  {
    name: 'University of Windsor',
    latitude: 42.3057,
    longitude: -83.0688
  },
  {
    name: 'Windsor City Hall',
    latitude: 42.3140,
    longitude: -83.0311
  },
  {
    name: 'Devonshire Mall',
    latitude: 42.2937,
    longitude: -82.9888
  },
  {
    name: 'Adventure Bay',
    latitude: 42.3002,
    longitude: -83.0454
  },
  {
    name: 'St. Clair College',
    latitude: 42.2819,
    longitude: -82.9561
  }
];

export function findDestination(input: string): Destination | null {
  const normalized = input.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  return (
    destinations.find((destination) => destination.name.toLowerCase().includes(normalized)) ||
    destinations.find((destination) => normalized.includes(destination.name.toLowerCase())) ||
    null
  );
}
