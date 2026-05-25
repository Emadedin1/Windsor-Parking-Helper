export function openGoogleMapsSearch(query: string): void {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

export function openDirections(origin: string, destination: string): void {
  window.open(
    `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`,
    '_blank',
    'noopener,noreferrer'
  );
}
