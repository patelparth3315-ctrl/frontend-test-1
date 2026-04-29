"use client";

import { useState } from "react";
import BookingOptions from "./BookingOptions";
import ItineraryAccordion from "./ItineraryAccordion";
import { Trip } from "@/types";

interface TripBookingSectionProps {
  trip: Trip;
  onPriceChange?: (price: number) => void;
}

export default function TripBookingSection({ trip, onPriceChange }: TripBookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [travelIndex, setTravelIndex] = useState(0);

  return (
    <div className="space-y-8 md:space-y-24">
      <BookingOptions 
        trip={trip} 
        onDateSelect={(date) => setSelectedDate(date)} 
        onVariantSelect={(idx) => setVariantIndex(idx)}
        onTravelSelect={(idx) => setTravelIndex(idx)}
        onPriceChange={onPriceChange}
      />
      
      <section id="itinerary" className="mb-24 scroll-mt-32">
        <ItineraryAccordion 
          itinerary={trip.itinerary} 
          startDate={selectedDate}
        />
      </section>
    </div>
  );
}
