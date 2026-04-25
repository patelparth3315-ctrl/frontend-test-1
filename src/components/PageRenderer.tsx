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

interface PageRendererProps {
  sections: any[];
  trips: any[];
  reviews: any[];
  blogs: any[];
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
                className="px-6"
              >
                <div className={`mx-auto ${data.maxWidth === 'narrow' ? 'max-w-2xl' : data.maxWidth === 'full' ? 'max-w-none' : 'max-w-5xl'}`}>
                  {data.title && <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tight">{data.title}</h2>}
                  <div className="prose prose-lg max-w-none prose-headings:uppercase prose-headings:tracking-tight" dangerouslySetInnerHTML={{ __html: data.body || '' }} />
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
