"use client";

import Hero from "./Hero";
import SocialProofBar from "./SocialProofBar";
import CommunityTrips from "./CommunityTrips";
import BestieSection from "./BestieSection";
import RealitySection from "./RealitySection";
import Destinations from "./Destinations";
import BlogSection from "./BlogSection";
import ReviewsSection from "./ReviewsSection";
import VibeSection from "./VibeSection";
import CTABanner from "./CTABanner";
import PhotoGrid from "./PhotoGrid";
import ImageGallery from "./ImageGallery";
import VideoSection from "./VideoSection";
import Testimonials from "./Testimonials";
import CTASlider from "./CTASlider";
import CinematicBanner from "./CinematicBanner";
import PhotoSlider from "./PhotoSlider";

import { Trip, Review, Blog } from "@/types";

interface PageRendererProps {
  sections: any[];
  trips?: Trip[];
  reviews?: Review[];
  blogs?: Blog[];
}

export default function PageRenderer({ sections = [], trips = [], reviews = [], blogs = [] }: PageRendererProps) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <>
      {sections.map((section, index) => {
        const { type, data } = section;
        
        switch (type) {
          case 'hero':
            return <Hero key={index} {...data} />;
          case 'social_proof':
            return <SocialProofBar key={index} {...data} />;
          case 'trips':
          case 'upcoming_trips':
          case 'featured_trips':
          case 'trending_trips':
            return <CommunityTrips key={index} trips={trips} {...data} />;
          case 'bestie':
            return <BestieSection key={index} {...data} />;
          case 'destinations':
            return <Destinations key={index} {...data} />;
          case 'reality':
            return <RealitySection key={index} {...data} />;
          case 'blogs':
          case 'journal':
            return <BlogSection key={index} blogs={blogs} {...data} />;
          case 'reviews':
            return <ReviewsSection key={index} reviews={reviews} {...data} />;
          case 'vibe':
            return <VibeSection key={index} {...data} />;
          case 'cta_banner':
            return <CTABanner key={index} {...data} />;
          case 'photo_grid':
            return <PhotoGrid key={index} {...data} />;
          case 'image_gallery':
            return <ImageGallery key={index} {...data} />;
          case 'testimonials':
            return <Testimonials key={index} {...data} />;
          case 'cta_slider':
            return <CTASlider key={index} {...data} />;
          case 'cinematic_banner':
            return <CinematicBanner key={index} {...data} />;
          case 'photo_slider':
            return <PhotoSlider key={index} {...data} />;
          case 'video_section':
            return <VideoSection key={index} {...data} />;
          case 'rich_text':
            return (
              <section 
                key={index}
                style={{ 
                  backgroundColor: data.backgroundColor || '#ffffff',
                  paddingTop: data.padding || '80px',
                  paddingBottom: data.padding || '80px'
                }}
                className="px-6 relative"
              >
                <div className={`mx-auto ${data.maxWidth === 'narrow' ? 'max-w-2xl' : data.maxWidth === 'full' ? 'max-w-none' : 'max-w-4xl'}`}>
                  {data.title && (
                    <h2 className="text-3xl md:text-4xl font-black mb-12 uppercase tracking-tighter text-[#ff4e00]">
                      {data.title}
                    </h2>
                  )}
                  <div 
                    className="rich-content prose prose-stone prose-lg max-w-none 
                               prose-headings:text-[#ff4e00] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                               prose-p:text-gray-700 prose-p:leading-relaxed 
                               prose-strong:text-gray-900 prose-strong:font-black
                               prose-li:text-gray-700
                               prose-h1:text-4xl prose-h1:mb-8
                               prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                               prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4" 
                    dangerouslySetInnerHTML={{ __html: data.body || '' }} 
                  />
                </div>
              </section>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
