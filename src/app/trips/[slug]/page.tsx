import { fetchTripBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
export const dynamic = 'force-dynamic';

import {
  Calendar, Check, X,
  ChevronRight, MessageCircle, Star, Shield,
  Map as MapIcon, Plane, Sparkles, HelpCircle,
  ChevronDown, CreditCard, Backpack, ImageIcon, TrendingUp, Users, ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import TravelTimeline from "@/components/TravelTimeline";

import AboutTrip from "@/components/AboutTrip";
import TripBookingSection from "@/components/TripBookingSection";
import TripHighlightsList from "@/components/TripHighlightsList";
import VideoSection from "@/components/VideoSection";
import TripFAQ from "@/components/TripFAQ";
import PopupDetails from "@/components/PopupDetails";
import ReviewReels from "@/components/ReviewReels";
import TripReviews from "@/components/TripReviews";
import FullCircuit from "@/components/FullCircuit";
import StaySection from "@/components/StaySection";
import StickyBookingCard from "@/components/StickyBookingCard";
import Link from "next/link";
import TripSubNav from "@/components/TripSubNav";
import { normalizeImageUrl } from "@/lib/api";
import TripGallerySection from "@/components/TripGallerySection";
import InclusionsExclusions from "@/components/InclusionsExclusions";


export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {


  const { slug } = await params;
  const trip = await fetchTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  const batches = (trip.availableDates && trip.availableDates.length > 0) 
    ? trip.availableDates.map((d: any) => ({
        date: d.date ? new Date(d.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : "TBA",
        price: trip.price,
        seats: d.capacity - d.bookedCount
      }))
    : [
        { date: "3 - 9 May '26", price: trip.price, seats: 3 },
        { date: "10 - 16 May '26", price: trip.price, seats: 2 },
        { date: "17 - 23 May '26", price: trip.price, seats: 5 },
      ];
  const navSections = [
    { id: "about", label: "About" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "highlights", label: "Highlights" },
    { id: "stay", label: "Stay" },
    { id: "faqs", label: "FAQs" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="bg-white min-h-screen font-montserrat pb-[80px] md:pb-0">
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        <div className="mb-12">
          <Link href="/trips" className="inline-flex items-center gap-2 text-zinc-400 hover:text-primary-orange mb-6 font-bold text-xs uppercase tracking-widest transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Expeditions
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-navy mb-4 tracking-tighter leading-[0.9] italic">
            Experience <span className="text-primary-orange not-italic font-semibold">{trip.title || "Our Expedition"}</span>
          </h1>
        </div>

        <TripGallerySection trip={trip} />


        <TripSubNav sections={navSections} />

        {/* Quick Info Bar - Open Grid Style */}
        <div className="flex flex-row overflow-x-auto no-scrollbar gap-x-12 md:gap-x-16 gap-y-8 mb-20 py-8 border-y border-zinc-100 w-full">
          {[
            { label: "Duration", val: trip.duration || "9 Days", icon: Calendar },
            { label: "Difficulty", val: trip.difficulty || "Moderate", icon: MapIcon },
            { label: "Age Group", val: trip.ageLimit || "15-35 years", icon: Users },
            { label: "Max Altitude", val: trip.maxAltitude || "15,000 ft", icon: TrendingUp },
          ].map((info, i) => (
            <div key={i} className="flex items-center gap-4 shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-primary-orange">
                <info.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <p className="text-zinc-500 font-bold text-base md:text-lg leading-none mb-1 whitespace-nowrap">{info.label}</p>
                <p className="text-zinc-400 font-medium text-sm md:text-base whitespace-nowrap">{info.val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div id="about">
              <AboutTrip description={trip.description || ""} />
            </div>
            
            <div id="itinerary">
              <FullCircuit route={trip.route || []} />
              <TripBookingSection 
                trip={trip} 
                inclusions={trip.inclusions || []}
                exclusions={trip.exclusions || []}
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

            <PopupDetails details={trip.popupDetails} />
          </div>

          <div className="lg:col-span-4">
            <StickyBookingCard trip={trip} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}


