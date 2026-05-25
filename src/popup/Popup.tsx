import { useCallback, useEffect, useMemo, useState } from 'react';
import { ParkingResultCard } from '../components/ParkingResultCard';
import { SavedParkingList } from '../components/SavedParkingList';
import { parkingLots, type ParkingLot } from '../shared/parkingLots';
import { findDestination } from '../shared/destinations';
import { calculateDistanceKm, formatDistance } from '../shared/distance';
import { clearPendingAddress, getPendingAddress, getSavedParkingSpots, removeSavedParkingSpot, saveParkingSpot, type SavedParkingSpot } from '../shared/storage';

export type ActiveTab = 'search' | 'saved';

interface SearchResult extends ParkingLot {
  distanceKm: number;
}

export function Popup() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');
  const [savedSpots, setSavedSpots] = useState<SavedParkingSpot[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'results' | 'unsupported' | 'error'>('idle');
  const [message, setMessage] = useState('Search for a Windsor destination to see nearby parking.');

  const destinationLabel = useMemo(() => {
    if (!query.trim()) {
      return 'Windsor';
    }

    return query.trim();
  }, [query]);

  const performSearch = useCallback(async (searchInput: string) => {
    const trimmed = searchInput.trim();

    if (!trimmed) {
      setStatus('error');
      setMessage('Please enter a Windsor address or destination.');
      return;
    }

    setStatus('loading');
    setMessage('Searching for nearby parking...');

    const destination = findDestination(trimmed);

    if (!destination) {
      setSearchResults([]);
      setStatus('unsupported');
      setMessage(
        'Exact address lookup is not available in this demo. Try a known Windsor destination like Downtown Windsor, Caesars Windsor, University of Windsor, Devonshire Mall, or Windsor City Hall.'
      );
      return;
    }

    const results = parkingLots
      .map((lot) => ({
        ...lot,
        distanceKm: calculateDistanceKm(destination, {
          latitude: lot.latitude,
          longitude: lot.longitude
        })
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm);

    setSearchResults(results);
    setStatus('results');
    setMessage(`Showing parking near ${trimmed}.`);
  }, []);

  useEffect(() => {
    const init = async () => {
      const saved = await getSavedParkingSpots();
      setSavedSpots(saved);

      const pendingAddress = await getPendingAddress();

      if (!pendingAddress) {
        return;
      }

      setQuery(pendingAddress);
      await clearPendingAddress();
      await performSearch(pendingAddress);
    };

    void init();
  }, [performSearch]);

  const refreshSavedSpots = async () => {
    const saved = await getSavedParkingSpots();
    setSavedSpots(saved);
  };

  const handleSave = async (parkingLot: ParkingLot) => {
    await saveParkingSpot(parkingLot);
    await refreshSavedSpots();

    setStatus((current) => (current === 'results' ? current : 'results'));
    setMessage('Parking spot saved.');
  };

  const handleRemove = async (parkingLotId: string) => {
    await removeSavedParkingSpot(parkingLotId);
    await refreshSavedSpots();
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await performSearch(query);
  };

  return (
    <div className="app-shell">
      <header className="header">
        <div>
          <h1>Windsor Parking Helper</h1>
          <p>Search local parking options near Windsor destinations.</p>
        </div>
        <span className="badge">Demo</span>
      </header>

      <main className="panel">
        <form onSubmit={handleSearch} className="search-form">
          <input
            aria-label="Enter a Windsor address or destination"
            className="search-input"
            placeholder="Enter a Windsor address or destination"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="primary-button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Searching' : 'Search'}
          </button>
        </form>

        <div className="tab-row">
          <button
            type="button"
            className={activeTab === 'search' ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab('search')}
          >
            Search
          </button>
          <button
            type="button"
            className={activeTab === 'saved' ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab('saved')}
          >
            Saved
          </button>
        </div>

        <div className={`alert ${status === 'error' ? 'error' : status === 'unsupported' ? 'error' : status === 'loading' ? '' : 'success'}`}>
          {status === 'loading' ? (
            <div className="loading-shell">
              <span className="spinner" />
              <span>{message}</span>
            </div>
          ) : (
            message
          )}
        </div>

        {activeTab === 'search' && (
          <section>
            <div className="status-row">
              <p className="subtitle">
                {status === 'results' ? `Showing ${searchResults.length} nearby lots` : 'Nearby parking results will appear here.'}
              </p>
            </div>

            {status === 'idle' && (
              <div className="empty-state">
                Try a known Windsor destination such as Downtown Windsor, Caesars Windsor, or University of Windsor.
              </div>
            )}

            {status === 'unsupported' && (
              <div className="empty-state">
                Exact address lookup is not available in this demo. Try one of the supported Windsor destinations.
              </div>
            )}

            {status === 'results' && (
              <div className="results-list">
                {searchResults.map((result) => (
                  <ParkingResultCard
                    key={result.id}
                    parkingLot={result}
                    distanceLabel={formatDistance(result.distanceKm)}
                    destinationLabel={destinationLabel}
                    isSaved={savedSpots.some((spot) => spot.parkingLot.id === result.id)}
                    onSave={handleSave}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'saved' && (
          <section>
            <div className="status-row">
              <p className="subtitle">Saved parking locations stay on your device.</p>
            </div>
            <SavedParkingList savedSpots={savedSpots} onRemove={handleRemove} destinationLabel={destinationLabel} />
          </section>
        )}
      </main>
    </div>
  );
}
