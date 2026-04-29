"use client";

import { useState } from "react";
import AboutTrip from "./AboutTrip";
import TripBookingSection from "./TripBookingSection";
import InclusionsExclusions from "./InclusionsExclusions";
import TripHighlightsList from "./TripHighlightsList";
import StaySection from "./StaySection";
import TripFAQ from "./TripFAQ";
import VideoSection from "./VideoSection";
import ReviewReels from "./ReviewReels";
import TripReviews from "./TripReviews";
import PopupDetails from "./PopupDetails";
import FullCircuit from "./FullCircuit";
import { Trip } from "@/types";

interface TripDetailViewProps {
  trip: Trip;
}

export default function TripDetailView({ trip }: TripDetailViewProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="lg:col-span-8 space-y-24">
      <div id="about">
        <AboutTrip description={trip.description || ""} />
      </div>
      
      <div id="itinerary">
        <FullCircuit route={trip.route || []} />
        <TripBookingSection 
          trip={trip} 
          onDateSelect={(date) => setSelectedDate(date)}
        />
      </div>

      <div id="inclusions">
        <InclusionsExclusions 
          inclusions={trip.inclusions || []}
          exclusions={trip.exclusions || []}
        />
      </div>

      <div id="highlights" className="space-y-16">
        <TripHighlightsList title="Activities & Experiences" items={trip.highlights || []} />
      </div>

      <div id="stay">
        <StaySection accommodations={trip.accommodations || []} />
      </div>

      <div id="faqs">
        <TripFAQ faqs={trip.faqs || []} />
      </div>

      <VideoSection videos={trip.videos || []} />

      <ReviewReels reels={trip.reels || []} />
      
      <div id="reviews">
        <TripReviews reviews={trip.reviews || []} />
      </div>

      <PopupDetails details={trip.popupDetails} startDate={selectedDate} />
    </div>
  );
}
