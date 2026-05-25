import type { ParkingLot } from '../shared/parkingLots';
import { openDirections, openGoogleMapsSearch } from '../shared/maps';

interface ParkingResultCardProps {
  parkingLot: ParkingLot;
  distanceLabel: string;
  destinationLabel: string;
  isSaved: boolean;
  onSave: (parkingLot: ParkingLot) => void;
  onRemove: (parkingLotId: string) => void;
}

export function ParkingResultCard({
  parkingLot,
  distanceLabel,
  destinationLabel,
  isSaved,
  onSave,
  onRemove
}: ParkingResultCardProps) {
  return (
    <article className="result-card">
      <div className="result-card-header">
        <div className="result-card-info">
          <h3>{parkingLot.name}</h3>
          <p className="result-meta">{parkingLot.address}</p>
          <p className="result-meta">{parkingLot.type}</p>
        </div>
        <span className="distance-pill">{distanceLabel}</span>
      </div>

      <p className="result-notes">{parkingLot.notes}</p>

      <div className="result-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => openGoogleMapsSearch(`${parkingLot.name}, ${parkingLot.address}`)}
        >
          Open in Google Maps
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={() => openDirections(destinationLabel, `${parkingLot.name}, ${parkingLot.address}`)}
        >
          Directions
        </button>
        {isSaved ? (
          <button type="button" className="remove-button" onClick={() => onRemove(parkingLot.id)}>
            Remove
          </button>
        ) : (
          <button type="button" className="ghost-button" onClick={() => onSave(parkingLot)}>
            Save
          </button>
        )}
      </div>
    </article>
  );
}
