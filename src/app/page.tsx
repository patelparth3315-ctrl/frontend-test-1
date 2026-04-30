import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import CommunityTrips from "@/components/CommunityTrips";
import BestieSection from "@/components/BestieSection";
import RealitySection from "@/components/RealitySection";
import Destinations from "@/components/Destinations";
import BlogSection from "@/components/BlogSection";
import ReviewsSection from "@/components/ReviewsSection";
import VibeSection from "@/components/VibeSection";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/Footer";
import PageRenderer from "@/components/PageRenderer";
import CTASlider from "@/components/CTASlider";
import VideoSection from "@/components/VideoSection";
import { fetchTrips, fetchReviews, fetchBlogs, fetchPageBySlug, fetchSettings } from "@/lib/api";

import { Trip, Review, Blog } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let trips: Trip[] = [];
  let reviews: Review[] = [];
  let blogs: Blog[] = [];
  let page: any = null;
  let settings: any = null;
  
  try {
    const [tripsData, reviewsData, blogsData, pageData, settingsData] = await Promise.all([
      fetchTrips(),
      fetchReviews(),
      fetchBlogs(),
      fetchPageBySlug('home'),
      fetchSettings()
    ]);
    
    trips = (tripsData || []).filter(t => t.status === 'published');
    reviews = reviewsData || [];
    blogs = (blogsData || []).filter(b => b.status === 'published');
    page = pageData;
    settings = settingsData;
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {page && page.sections && page.sections.length > 0 ? (
        <>
          <PageRenderer sections={page.sections} trips={trips} reviews={reviews} blogs={blogs} />
          {/* Force new sections if not in DB */}
          {!page.sections.some((s: any) => s.type === 'cta_slider') && <CTASlider />}
          {!page.sections.some((s: any) => s.type === 'video_section') && <VideoSection />}
        </>
      ) : (
        <>
          <Hero />
          <SocialProofBar />
          <CommunityTrips trips={trips} />
          <BestieSection />
          <Destinations />
          <RealitySection />
          <CTASlider />
          <VideoSection />
          <BlogSection blogs={blogs} />
          <ReviewsSection reviews={reviews} />
          <VibeSection />
        </>
      )}
      <FloatingSocialBar />
      <Footer 
        logoUrl={settings?.footer?.logoUrl} 
        address={settings?.footer?.address} 
        phone={settings?.footer?.phone} 
      />
    </div>
  );
}
