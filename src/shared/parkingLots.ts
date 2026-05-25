export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
  notes: string;
}

export const parkingLots: ParkingLot[] = [
  {
    id: 'downtown-public-1',
    name: 'Downtown Windsor Public Lot',
    address: '250 Walker Rd, Windsor, ON',
    latitude: 42.3180,
    longitude: -83.0277,
    type: 'Public Lot',
    notes: 'Convenient access to downtown shops and restaurants.'
  },
  {
    id: 'caesars-garage',
    name: 'Caesars Windsor Garage',
    address: '3770 Walker Rd, Windsor, ON',
    latitude: 42.3183,
    longitude: -83.0341,
    type: 'Garage',
    notes: 'Indoor parking close to the casino and riverfront.'
  },
  {
    id: 'university-west-1',
    name: 'University of Windsor West Lot',
    address: '401 Sunset Ave, Windsor, ON',
    latitude: 42.3047,
    longitude: -83.0698,
    type: 'Campus Area',
    notes: 'Short walk to campus buildings and lecture halls.'
  },
  {
    id: 'city-hall-lot',
    name: 'Windsor City Hall Lot',
    address: '3500 Walker Rd, Windsor, ON',
    latitude: 42.3136,
    longitude: -83.0311,
    type: 'Public Lot',
    notes: 'A reliable downtown option near municipal offices.'
  },
  {
    id: 'devonshire-structure',
    name: 'Devonshire Mall East Garage',
    address: '3100 Walker Rd, Windsor, ON',
    latitude: 42.2940,
    longitude: -82.9881,
    type: 'Garage',
    notes: 'Easy access to retail and the mall entrance.'
  },
  {
    id: 'adventure-bay-area',
    name: 'Adventure Bay Street Parking',
    address: '123 Riverfront Ave, Windsor, ON',
    latitude: 42.3005,
    longitude: -83.0455,
    type: 'Street Parking',
    notes: 'Seasonal riverside parking near the waterfront.'
  },
  {
    id: 'st-clair-street',
    name: 'St. Clair College Surface Lot',
    address: '2000 Lauzon Pkwy, Windsor, ON',
    latitude: 42.2824,
    longitude: -82.9570,
    type: 'Campus Area',
    notes: 'Good option for students and campus visitors.'
  },
  {
    id: 'riverfront-garage',
    name: 'Riverfront Station Garage',
    address: '500 River Rd, Windsor, ON',
    latitude: 42.3131,
    longitude: -83.0435,
    type: 'Garage',
    notes: 'Close to transit, restaurants, and the waterfront.'
  },
  {
    id: 'towne-centre-lot',
    name: 'Towne Centre Surface Lot',
    address: '7200 Malden Rd, Windsor, ON',
    latitude: 42.2915,
    longitude: -82.9998,
    type: 'Public Lot',
    notes: 'A practical option for shopping and nearby businesses.'
  },
  {
    id: 'canal-park-area',
    name: 'Canal Park Street Parking',
    address: '8800 Chappell Ave, Windsor, ON',
    latitude: 42.2991,
    longitude: -83.0184,
    type: 'Street Parking',
    notes: 'Convenient for casual visits to the canal and nearby trails.'
  }
];
