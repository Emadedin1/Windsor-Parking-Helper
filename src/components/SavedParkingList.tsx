import type { SavedParkingSpot } from '../shared/storage';
import type { ParkingLot } from '../shared/parkingLots';
import { openDirections, openGoogleMapsSearch } from '../shared/maps';

interface SavedParkingListProps {
  savedSpots: SavedParkingSpot[];
  onRemove: (parkingLotId: string) => void;
  destinationLabel: string;
}

export function SavedParkingList({ savedSpots, onRemove, destinationLabel }: SavedParkingListProps) {
  if (savedSpots.length === 0) {
    return (
      <div className="empty-state">
        No saved parking spots yet. Save a lot from the search results to keep it here.
      </div>
    );
  }

  return (
    <div className="saved-list">
      {savedSpots.map((item) => (
        <article key={item.parkingLot.id} className="saved-item">
          <h3>{item.parkingLot.name}</h3>
          <p>{item.parkingLot.address}</p>
          <p>{item.parkingLot.type}</p>
          <div className="saved-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => openGoogleMapsSearch(`${item.parkingLot.name}, ${item.parkingLot.address}`)}
            >
              Open in Google Maps
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => openDirections(destinationLabel, `${item.parkingLot.name}, ${item.parkingLot.address}`)}
            >
              Directions
            </button>
            <button type="button" className="remove-button" onClick={() => onRemove(item.parkingLot.id)}>
              Remove
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
