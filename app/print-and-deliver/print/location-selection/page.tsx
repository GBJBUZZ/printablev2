"use client";

import { useOrder, DocumentItem } from "@/context/orderContext";
import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  ChevronLeft,
  Clock,
  Search,
  Store,
  Home,
  Check,
  MapPinOff,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { NavBar } from "@/components/nav-bar"; // Assuming this exists
import { cn } from "@/lib/utils"; // Assuming this exists
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

// --- React Toastify Imports ---
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
// --- End React Toastify Imports ---
import { useRouter } from "next/navigation";

interface Merchant {
  merchantId: string;
  shopName: string;
  latitude: string | null; // UPDATED: Latitude as string (from API response)
  longitude: string | null; // UPDATED: Longitude as string (from API response)
  MerchantImages: any[];
  averageRating: string;
  ratingCount: number;
  googleDistance: string;
  duration: string;
  durationInTraffic: string;
  address?: string; // ADDED: Address can be optional if not always returned or needed for InfoWindow
  services?: string[]; // ADDED: Optional services property
}

// Mock merchant data - UPDATED WITH LATITUDE AND LONGITUDE
const MERCHANTS: Merchant[] = [
  {
    merchantId: "merchant_1",
    shopName: "Print Master Shop",
    latitude: "40.7150", // Example coordinates
    longitude: "-74.0080", // Example coordinates
    MerchantImages: ["/placeholder.svg?height=150&width=300"],
    averageRating: "4.80",
    ratingCount: 123,
    googleDistance: "0.5 km",
    duration: "2 mins",
    durationInTraffic: "2 mins",
    address: "123 Main St, New York, NY 10001",
  },
  {
    merchantId: "merchant_2",
    shopName: "Quality Print Solutions",
    latitude: "40.7090", // Example coordinates
    longitude: "-74.0120", // Example coordinates
    MerchantImages: ["/placeholder.svg?height=150&width=300"],
    averageRating: "4.90",
    ratingCount: 500,
    googleDistance: "1.2 km",
    duration: "5 mins",
    durationInTraffic: "6 mins",
    address: "456 Oak Ave, New York, NY 10004",
  },
  {
    merchantId: "merchant_3",
    shopName: "Quick Print Services",
    latitude: "40.7200", // Example coordinates
    longitude: "-73.9950", // Example coordinates
    MerchantImages: ["/placeholder.svg?height=150&width=300"],
    averageRating: "3.50",
    ratingCount: 56,
    googleDistance: "2.1 km",
    duration: "8 mins",
    durationInTraffic: "10 mins",
    address: "789 Pine Ln, New York, NY 10002",
  },
];

type DeliveryOption = "pickup" | "delivery";
type LocationPermissionStatus =
  | "prompt"
  | "granted"
  | "denied"
  | "unsupported"
  | "loading";

declare global {
  interface Window {
    google: any;
  }
}

export default function LocationSelectionPage() {
  const { user } = useUser();
  const router = useRouter();
  const handelOrderSubmit = async () => {
    if (!selectedMerchant) {
      toast.error("Please select a merchant.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const orderFinal = {
      ...order,
    };

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/order/`,
        {
          method: "POST",
          body: JSON.stringify({
            ...order,
            merchantId: selectedMerchant,
            userId: user?.id || "1",
            latitude: userLocation?.lat,
            longitude: userLocation?.lng,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log({ ...orderFinal, merchantId: selectedMerchant });
      const res = await result.json();
      console.log(res);

      if (result.ok) {
        toast.success("🦄 Wow so easy! Order submitted successfully.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false, // Kept as per your example
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // Optionally, you can redirect or clear the form here

        router.push("/orders");
      } else {
        toast.error(
          res.message || "Order submission failed. Please try again.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
          },
        );
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const { order, dispatch } = useOrder();
  const [selectedMerchant, setSelectedMerchant] = useState<String | null>(null);
  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOption>("pickup");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationPermission, setLocationPermission] =
    useState<LocationPermissionStatus>("loading");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbyMerchants, setNearbyMerchants] = useState<Merchant[]>([]);
  const [isLoadingMerchants, setIsLoadingMerchants] = useState(true);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const merchantMarkersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

 const filteredMerchants = nearbyMerchants.filter((merchant) =>
  merchant.shopName?.toLowerCase().includes(searchQuery.toLowerCase())
);

  const getUserLocation = () => {
    setLocationPermission("loading");
    setIsLoadingMerchants(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userCoords);
        setLocationPermission("granted");

        if (googleMapRef.current) {
          updateUserLocationOnMap(userCoords);
        }

        (async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/user/nearest-merchants?lat=${userCoords.lat}&long=${userCoords.lng}`,
            );
            const data = await response.json();

            if (!response.ok) {
              console.log("Error while fetching Merchant data:", data);
              setNearbyMerchants(MERCHANTS); // Fallback to mock
            } else {
              console.log("Nearby merchants from API:", data);
              const apiMerchants: Merchant[] = data.map((item: any) => ({
                merchantId: item.merchantId,
                shopName: item.shopName,
                latitude: item.latitude ? String(item.latitude) : null,
                longitude: item.longitude ? String(item.longitude) : null,
                MerchantImages: item.MerchantImages || [],
                averageRating: item.averageRating || "0.00",
                ratingCount: item.ratingCount || 0,
                googleDistance: item.googleDistance || "N/A",
                duration: item.duration || "N/A",
                durationInTraffic: item.durationInTraffic || "N/A",
                address: item.address || "Address not available",
              }));
              setNearbyMerchants(apiMerchants);
            }
          } catch (e) {
            console.log("Error while calling API", e);
            setNearbyMerchants(MERCHANTS); // Fallback to mock
          } finally {
            setIsLoadingMerchants(false);
          }
        })();
      },
      (error) => {
        console.error("Geolocation error:", error);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationPermission("denied");
        } else {
          setLocationPermission("denied");
        }
        setIsLoadingMerchants(false);
        setNearbyMerchants(MERCHANTS);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationPermission("unsupported");
      setIsLoadingMerchants(false);
      setNearbyMerchants(MERCHANTS);
      return;
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          setLocationPermission(
            permissionStatus.state as LocationPermissionStatus,
          );

          if (
            permissionStatus.state === "granted" ||
            permissionStatus.state === "prompt"
          ) {
            getUserLocation();
          } else {
            setIsLoadingMerchants(false);
            setNearbyMerchants(MERCHANTS);
          }

          permissionStatus.onchange = () => {
            setLocationPermission(
              permissionStatus.state as LocationPermissionStatus,
            );
            if (permissionStatus.state === "granted") {
              getUserLocation();
            } else if (permissionStatus.state === "denied") {
              setIsLoadingMerchants(false);
              setNearbyMerchants(MERCHANTS);
              setUserLocation(null);
            }
          };
        })
        .catch(() => {
          console.warn(
            "Permissions API failed, falling back to direct geolocation.",
          );
          getUserLocation();
        });
    } else {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google?.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (mapLoaded && googleMapRef.current) {
      merchantMarkersRef.current.forEach((marker) => marker.setMap(null));
      merchantMarkersRef.current.clear();

      if (!infoWindowRef.current) {
        infoWindowRef.current = new window.google.maps.InfoWindow();
      }

      nearbyMerchants.forEach((merchant) => {
        if (merchant.latitude && merchant.longitude) {
          const merchantCoords = {
            lat: parseFloat(merchant.latitude),
            lng: parseFloat(merchant.longitude),
          };

          const merchantIcon = {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06044b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3" fill="#61e987"></circle>
                </svg>`,
              ),
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40),
          };

          const marker = new window.google.maps.Marker({
            position: merchantCoords,
            map: googleMapRef.current,
            title: merchant.shopName,
            icon: merchantIcon,
            zIndex: 900,
          });

          marker.infoWindowContent = `
            <div style="font-family: sans-serif; padding: 5px; text-align: center; color: #06044b;">
              <strong style="font-size: 1.1em;">${merchant.shopName}</strong>
              ${merchant.address ? `<p style="font-size: 0.8em; margin-top: 5px; color: #555;">${merchant.address}</p>` : ""}
            </div>
          `;

          marker.addListener("click", () => {
            setSelectedMerchant(merchant.merchantId);
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }
            infoWindowRef.current?.setContent(marker.infoWindowContent);
            infoWindowRef.current?.open(googleMapRef.current, marker);

            const element = document.getElementById(
              `merchant-${merchant.merchantId}`,
            );
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          });

          merchantMarkersRef.current.set(merchant.merchantId, marker);
        }
      });

      googleMapRef.current.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
      });
    }
  }, [nearbyMerchants, mapLoaded]);

  useEffect(() => {
    if (selectedMerchant && googleMapRef.current && mapLoaded) {
      const selectedMerchantData = nearbyMerchants.find(
        (m) => m.merchantId === selectedMerchant,
      );

      if (
        selectedMerchantData &&
        selectedMerchantData.latitude &&
        selectedMerchantData.longitude
      ) {
        const selectedCoords = {
          lat: parseFloat(selectedMerchantData.latitude),
          lng: parseFloat(selectedMerchantData.longitude),
        };
        googleMapRef.current.panTo(selectedCoords);
        googleMapRef.current.setZoom(15);

        const marker = merchantMarkersRef.current.get(
          selectedMerchant as string,
        ); // Added type assertion
        if (marker && infoWindowRef.current) {
          infoWindowRef.current.close();
          //@ts-ignore
          infoWindowRef.current.setContent(marker.infoWindowContent);
          infoWindowRef.current.open(googleMapRef.current, marker);
        }
      }
    }
  }, [selectedMerchant, nearbyMerchants, mapLoaded]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const defaultCenter = { lat: 40.7128, lng: -74.006 };
    const initialCenter = userLocation || defaultCenter;

    const mapOptions: google.maps.MapOptions = {
      center: initialCenter,
      zoom: 14,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_TOP,
      },
    };

    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      googleMapRef.current = map;
      setMapLoaded(true);

      if (userLocation) {
        updateUserLocationOnMap(userLocation);
      }
    }
  };

  const updateUserLocationOnMap = (location: { lat: number; lng: number }) => {
    if (!googleMapRef.current) return;

    googleMapRef.current.panTo(location);
    //@ts-ignore
    if (googleMapRef.current.getZoom() < 14) {
      googleMapRef.current.setZoom(14);
    }

    const userIcon = {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#06044b" stroke="#ffffff" stroke-width="2">
            <circle cx="12" cy="12" r="10" fill="#06044b" stroke="#ffffff" stroke-width="2"/>
            <circle cx="12" cy="12" r="4" fill="#61e987"/>
          </svg>`,
        ),
      scaledSize: new window.google.maps.Size(30, 30),
      anchor: new window.google.maps.Point(15, 15),
    };

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition(location);
      userMarkerRef.current.setMap(googleMapRef.current);
    } else {
      userMarkerRef.current = new window.google.maps.Marker({
        position: location,
        map: googleMapRef.current,
        title: "Your Location",
        icon: userIcon,
        zIndex: 1000,
      });
      //@ts-ignore
      userMarkerRef.current.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
        infoWindowRef.current?.setContent(`
          <div style="font-family: sans-serif; padding: 5px; text-align: center; color: #06044b;">
            <strong>Your Location</strong>
          </div>
        `);
        infoWindowRef.current?.open(
          googleMapRef.current!, // Added non-null assertion
          userMarkerRef.current!, // Added non-null assertion
        );
      });
    }
  };

  const renderStars = (rating: number) => {
    const numericRating = parseFloat(rating.toString());
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(numericRating)
                ? "text-yellow-400"
                : star - 0.5 <= numericRating
                  ? "text-yellow-400"
                  : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-500">
          ({numericRating.toFixed(1)})
        </span>
      </div>
    );
  };

  const renderLocationPermissionMessage = () => {
    if (locationPermission === "granted" && userLocation) return null;

    if (locationPermission === "denied") {
      return (
        <Alert className="mb-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <MapPinOff className="h-5 w-5 text-yellow-600 mr-2" />
            <AlertDescription className="text-yellow-700">
              Location access denied. Please enable location services in your
              browser settings to see nearby merchants.
            </AlertDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            onClick={getUserLocation}
          >
            Try Again
          </Button>
        </Alert>
      );
    }

    if (
      locationPermission === "loading" ||
      (locationPermission === "prompt" && isLoadingMerchants)
    ) {
      return (
        <Alert className="mb-4 bg-[#f0fdf4] border-[#90f0ab]">
          <div className="flex items-center">
            {isLoadingMerchants ? (
              <Loader2 className="h-5 w-5 text-[#06044b] mr-2 animate-spin" />
            ) : (
              <MapPin className="h-5 w-5 text-[#06044b] mr-2" />
            )}
            <AlertDescription>
              {isLoadingMerchants
                ? "Fetching your location..."
                : "Please allow location access to find printing locations near you."}
            </AlertDescription>
          </div>
        </Alert>
      );
    }

    if (locationPermission === "unsupported") {
      return (
        <Alert className="mb-4 bg-gray-50 border-gray-200">
          <AlertDescription>
            Your browser doesn't support geolocation. We're showing all
            available merchants.
          </AlertDescription>
        </Alert>
      );
    }

    if (locationPermission === "prompt" && !isLoadingMerchants) {
      return (
        <Alert className="mb-4 bg-[#f0fdf4] border-[#90f0ab]">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-[#06044b] mr-2" />
            <AlertDescription>
              Awaiting your location permission. Please check your browser
              prompt.
            </AlertDescription>
          </div>
        </Alert>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[white] flex flex-col items-center py-12 px-4">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="bg-white rounded-xl p-8 w-full max-w-5xl   mb-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center mr-4">
            <MapPin className="h-6 w-6 text-[#06044b]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Location Selection</h2>
            <p className="text-sm text-[#555555]">
              Choose a merchant and delivery option
            </p>
          </div>
        </div>

        {renderLocationPermissionMessage()}
        <div>
          <div className="bg-[#F4F7FA] rounded-full p-1 flex w-full justify-start items-start max-w-md  mb-6">
            <button
              className={cn(
                "flex-1 py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium",
                deliveryOption === "pickup"
                  ? "bg-white text-[#06044b] shadow-sm"
                  : "text-[#555555] hover:text-[#06044b]",
              )}
              onClick={() => setDeliveryOption("pickup")}
            >
              <Store className="h-4 w-4" />
              Store Pickup
            </button>
            <button
              className={cn(
                "flex-1 py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium",
                deliveryOption === "delivery"
                  ? "bg-white text-[#06044b] shadow-sm"
                  : "text-[#555555] hover:text-[#06044b]",
              )}
              onClick={() => setDeliveryOption("delivery")}
            >
              <Home className="h-4 w-4" />
              Home Delivery
            </button>
          </div>
        </div>

        <h3 className="font-medium mb-3">Select Location</h3>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by name, address or specialty"
            className="pl-10 pr-4 py-2 bg-white shadow-sm text-sm text-black rounded-lg w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61e987]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div
          ref={mapRef}
          className="w-full h-[200px] rounded-lg mb-4 bg-gray-100 overflow-hidden"
        />

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {isLoadingMerchants &&
        !userLocation &&
        locationPermission !== "unsupported" ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-[#61e987] animate-spin mb-4" />
            <p className="text-[#06044b]">Finding merchants near you...</p>
            <p className="text-sm text-gray-500 mt-1">This may take a moment</p>
          </div>
        ) : filteredMerchants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <div
                key={merchant.merchantId}
                className={cn(
                  "border rounded-xl shadow-sm bg-white transition-all hover:shadow-md",
                  selectedMerchant === merchant.merchantId
                    ? "border-[#61e987] ring-2 ring-[#90f0ab]"
                    : "border-gray-200",
                )}
              >
                <div
                  onClick={() => setSelectedMerchant(merchant.merchantId)}
                  className="cursor-pointer"
                >
                  <img
                    src={merchant.MerchantImages[0] || "/placeholder.svg"}
                    alt={merchant.shopName}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-base font-semibold text-[#06044b] leading-tight">
                        {merchant.shopName}
                      </h4>
                      <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        {parseFloat(merchant.averageRating).toFixed(1)} ★
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mb-2">
                      {merchant.address}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{merchant.duration}</span>
                      </div>
                      <span>· {merchant.googleDistance}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(merchant.services || []).map((service, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedMerchant(merchant.merchantId)}
                      className={cn(
                        "w-full text-sm font-medium py-2 border rounded-lg transition",
                        selectedMerchant === merchant.merchantId
                          ? "border-[#61e987] bg-[#f0fdf4] text-[#06044b]"
                          : "border-gray-300 bg-white text-gray-700 hover:border-[#61e987]",
                      )}
                    >
                      Select Shop
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MapPinOff className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              No merchants found matching your search.
            </p>
            {locationPermission !== "granted" && !isLoadingMerchants && (
              <p className="text-sm text-gray-500 mt-2">
                Showing all available merchants instead.
              </p>
            )}
          </div>
        )}

        <Button
          className="w-full mt-6 bg-[#06044b] hover:bg-[#06044b]/90 text-white text-sm font-semibold uppercase tracking-wide py-3 rounded-lg"
          disabled={!selectedMerchant || isLoadingMerchants}
          onClick={handelOrderSubmit}
        >
          Confirm Selection
        </Button>
      </div>

      <div className="flex justify-between w-full max-w-5xl mt-4">
        <Link href="/print-and-deliver/print">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#d0d0d0] text-[#555555] py-2 px-4 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <Link
          href={
            selectedMerchant
              ? `/checkout?merchant=${selectedMerchant}&option=${deliveryOption}`
              : "#"
          }
        >
          <Button
            className="bg-[#06044b] hover:bg-[#06044b]/90 text-white px-6 py-3 uppercase text-xs font-semibold tracking-wider rounded-lg"
            disabled={!selectedMerchant || isLoadingMerchants}
          >
            Continue To Payment
          </Button>
        </Link>
      </div>
    </div>
  );
}
