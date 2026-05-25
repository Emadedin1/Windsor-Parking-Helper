import type { ParkingLot } from './parkingLots';

export interface SavedParkingSpot {
  parkingLot: ParkingLot;
  savedAt: string;
}

export async function getSavedParkingSpots(): Promise<SavedParkingSpot[]> {
  const result = await chrome.storage.local.get(['savedParking']);

  if (!Array.isArray(result.savedParking)) {
    return [];
  }

  return result.savedParking as SavedParkingSpot[];
}

export async function saveParkingSpot(parkingLot: ParkingLot): Promise<void> {
  const existing = await getSavedParkingSpots();

  if (existing.some((item) => item.parkingLot.id === parkingLot.id)) {
    return;
  }

  await chrome.storage.local.set({
    savedParking: [...existing, { parkingLot, savedAt: new Date().toISOString() }]
  });
}

export async function removeSavedParkingSpot(id: string): Promise<void> {
  const existing = await getSavedParkingSpots();
  const next = existing.filter((item) => item.parkingLot.id !== id);

  await chrome.storage.local.set({ savedParking: next });
}

export async function getPendingAddress(): Promise<string | null> {
  const result = await chrome.storage.local.get(['pendingAddress']);

  if (typeof result.pendingAddress !== 'string') {
    return null;
  }

  return result.pendingAddress;
}

export async function clearPendingAddress(): Promise<void> {
  await chrome.storage.local.remove(['pendingAddress']);
}
