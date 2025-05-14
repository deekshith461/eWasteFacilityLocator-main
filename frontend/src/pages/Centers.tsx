import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import Button from '../components/Button';
import Footer from '../components/Footer';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Extended center type with rating and estimated time
interface Center {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  rating: number;
  reviewCount: number;
}

// Centers data with added rating and review count
const centers = [
  // Hyderabad
  { id: 6, name: 'Transducers & Controls Pvt Ltd', lat: 17.385044, lng: 78.486671, address: 'Balanagar, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 7, name: 'Vsn Technologies', lat: 17.467954, lng: 78.442932, address: 'Balanagar, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 8, name: 'Hyderabad Flextech Ltd.', lat: 17.469199, lng: 78.442063, address: 'Balanagar, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 9, name: 'Agrogen India', lat: 17.471374, lng: 78.443779, address: 'Balanagar, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 10, name: 'C.B. Enterprises', lat: 17.446955, lng: 78.450759, address: 'Balkampet, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 11, name: 'Yamuna Digital Electronics Pvt. Ltd.', lat: 17.417254, lng: 78.449584, address: 'Banjara Hills, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 12, name: 'Scalemaster Adlam Pvt Ltd.', lat: 17.525591, lng: 78.484317, address: 'Basheerbagh, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 13, name: 'Linkwell Telesystems Pvt. Ltd.', lat: 17.444714, lng: 78.462591, address: 'Begumpet, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 14, name: 'Twin Data Systems Pvt. Ltd.', lat: 17.445243, lng: 78.464401, address: 'Begumpet, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 15, name: 'Sulakshana Circuits Ltd.', lat: 17.546291, lng: 78.356851, address: 'Bollaram, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 16, name: 'Concept Shapers & Electronics', lat: 17.469255, lng: 78.598628, address: 'Cherlapalli, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 17, name: 'Cygnus Microsystems (P) Ltd', lat: 17.466566, lng: 78.442155, address: 'Cherlapalli, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 18, name: 'Nucleonix Systems Pvt. Ltd.', lat: 17.470671, lng: 78.605935, address: 'Cherlapalli, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 19, name: 'Vr Electronics', lat: 17.473723, lng: 78.569013, address: 'Cherlapalli, Hyderabad', rating: 4.2, reviewCount: 156 },
  { id: 20, name: 'Cal – On Instruments', lat: 17.462985, lng: 78.609425, address: 'Cherlapalli, Hyderabad', rating: 4.2, reviewCount: 156 },

  // J&K
  { id: 21, name: 'Zubair Recycling Center', lat: 34.0231489, lng: 72.6185282, address: 'J&K', rating: 4.2, reviewCount: 156 },
  { id: 22, name: 'SEHRAN Recycle Company', lat: 34.0231489, lng: 72.6185282, address: 'J&K', rating: 4.2, reviewCount: 156 },

  // Himachal Pradesh
  { id: 31, name: 'E-waste recycling company in Baddi', lat: 30.957827, lng: 76.264035, address: 'Baddi, Himachal Pradesh', rating: 4.2, reviewCount: 156 },

  // Andhra Pradesh
  { id: 41, name: 'WORLD SCRAP RECYCLING SOLUTIONS PVT. LTD', lat: 13.6317452, lng: 78.9571175, address: 'Andhra Pradesh', rating: 4.2, reviewCount: 156 },
  { id: 42, name: 'Re Sustainability and Recycling Private Limited', lat: 17.6458865, lng: 82.5546299, address: 'Andhra Pradesh', rating: 4.2, reviewCount: 156 },

  // Arunachal Pradesh
  { id: 51, name: 'RRR Centre Pasighat', lat: 28.0430156, lng: 95.2049344, address: 'Pasighat, Arunachal Pradesh', rating: 4.2, reviewCount: 156 },

  // Assam
  { id: 61, name: 'AXOM Refurbisher', lat: 26.2563766, lng: 91.5217502, address: 'Assam', rating: 4.2, reviewCount: 156 },

  // Bihar
  { id: 71, name: 'Recycling Bazar', lat: 25.6080374, lng: 76.705543, address: 'Bihar', rating: 4.2, reviewCount: 156 },

  // Chhattisgarh
  { id: 81, name: 'Wastech India', lat: 21.2577275, lng: 81.3977962, address: 'Chhattisgarh', rating: 4.2, reviewCount: 156 },

  // Goa
  { id: 91, name: 'Global E-Waste Management System', lat: 15.4035061, lng: 73.7367643, address: 'Goa', rating: 4.2, reviewCount: 156 },

  // Gujarat
  { id: 101, name: 'Waste Wala Corporation', lat: 22.2829777, lng: 68.6647498, address: 'Gujarat', rating: 4.2, reviewCount: 156 },

  // Haryana
  { id: 111, name: 'Reload Digital India E-Waste Recycling', lat: 28.4498734, lng: 76.3673827, address: 'Haryana', rating: 4.2, reviewCount: 156 },

  // Jharkhand
  { id: 121, name: 'E-Waste Recyclers India', lat: 28.581155, lng: 77.1977297, address: 'Jharkhand', rating: 4.2, reviewCount: 156 },

  // Karnataka
  { id: 131, name: 'Best E-waste Recyclers private limited', lat: 13.5067076, lng: 76.5083035, address: 'Karnataka', rating: 4.2, reviewCount: 156 },
];

// Function to calculate Haversine distance in km
const haversineDistance = (coords1: [number, number], coords2: [number, number]): number => {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const toRad = (angle: number): number => (Math.PI / 180) * angle;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

// Function to estimate travel time based on distance
const estimateTravelTime = (distanceKm: number): number => {
  const averageSpeedKmH = 10; // Average urban speed
  return Math.round((distanceKm / averageSpeedKmH) * 60); // Convert to minutes
};

// Star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-600'
            }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-400">({rating.toFixed(1)})</span>
    </div>
  );
};

const Centers = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [displayedCenters, setDisplayedCenters] = useState<(Center & { distance: number; travelTime: number })[]>([]);
  const [viewingAll, setViewingAll] = useState(false);
  const [allCentersWithDistance, setAllCentersWithDistance] = useState<(Center & { distance: number; travelTime: number })[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);

          // Calculate distances and travel times for all centers
          const centersWithDistance = centers
            .map((center) => {
              const distance = haversineDistance(location, [center.lat, center.lng]);
              return {
                ...center,
                distance,
                travelTime: estimateTravelTime(distance),
              };
            })
            .sort((a, b) => a.distance - b.distance);

          setAllCentersWithDistance(centersWithDistance);
          setDisplayedCenters(centersWithDistance.slice(0, 4));
        },
        (error) => {
          console.error('Error getting location:', error);
          const defaultLocation: [number, number] = [17.385044, 78.486671];
          setUserLocation(defaultLocation);

          const centersWithDistance = centers
            .map((center) => {
              const distance = haversineDistance(defaultLocation, [center.lat, center.lng]);
              return {
                ...center,
                distance,
                travelTime: estimateTravelTime(distance),
              };
            })
            .sort((a, b) => a.distance - b.distance);

          setAllCentersWithDistance(centersWithDistance);
          setDisplayedCenters(centersWithDistance.slice(0, 4));
        }
      );
    }
  }, []);

  const toggleView = () => {
    setViewingAll(!viewingAll);
    setDisplayedCenters(viewingAll ? allCentersWithDistance.slice(0, 4) : allCentersWithDistance);
  };

  if (!userLocation) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-[calc(100vh-64px)] bg-black text-white">
      <div className="bg-black shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Recycling Centers</h1>
              <p className="mt-2 text-gray-400">Find e-waste recycling centers near you</p>
            </div>
            <Button
              onClick={toggleView}
              className="bg-[#3c9c1c]/80 text-white hover:bg-[#3c9c1c]/60"
            >
              {viewingAll ? 'Show Nearest' : 'View All'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-black rounded-lg shadow-md p-4 mb-6 border border-gray-700">
          <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
              <div className="bg-black rounded-lg shadow-md overflow-hidden h-[600px] border border-gray-700">
                <MapContainer
                  center={userLocation}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {/* Add CircleMarker for user location */}
                  {userLocation && (
                    <CircleMarker 
                      center={userLocation}
                      pathOptions={{ 
                        color: '#2196f3',
                        fillColor: '#2196f3',
                        fillOpacity: 0.7
                      }}
                      radius={8}
                    >
                      <Popup>Your Location</Popup>
                    </CircleMarker>
                  )}
                  {centers.map((center) => (
                    <Marker key={center.id} position={[center.lat, center.lng]}>
                      <Popup>
                        <div className="p-2 text-gray-800">
                          <h3 className="font-semibold">{center.name}</h3>
                          <p className="text-sm text-gray-600">{center.address}</p>
                          <StarRating rating={center.rating} />
                          <Button size="sm" className="mt-2 bg-[#3c9c1c] text-white hover:bg-[#3c9c1c]">
                            Schedule Pickup
                          </Button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {displayedCenters.map((center) => (
                <div key={center.id} className="bg-black p-4 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{center.name}</h3>
                    <StarRating rating={center.rating} />
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{center.address}</p>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {center.travelTime} min
                    </div>
                    <div className="text-xs text-gray-500">
                      Distance: {center.distance.toFixed(2)} km
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}${userLocation ? `&origin=${userLocation[0]},${userLocation[1]}` : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button size="sm" variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                        Get Directions
                      </Button>
                    </a>
                    <Link
                      to="/schedule"
                      className="flex-1 inline-flex items-center justify-center px-3 py-1 bg-[#3c9c1c] text-white rounded hover:bg-[#3c9c1c]/90"
                    >
                      Schedule Pickup
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Centers;