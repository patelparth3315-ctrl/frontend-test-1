import PageRenderer from "@/components/PageRenderer";
import { fetchTrips, fetchReviews, fetchDraftPageBySlug } from "@/lib/api";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

import { Trip, Review } from "@/types";

export default async function PreviewPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  let trips: Trip[] = [];
  let reviews: Review[] = [];
  let page: any = null;
  
  try {
    const [tripsData, reviewsData, pageData] = await Promise.all([
      fetchTrips(),
      fetchReviews(),
      fetchDraftPageBySlug(slug)
    ]);
    
    trips = (tripsData || []).filter(t => t.status === 'published');
    reviews = reviewsData || [];
    page = pageData;
  } catch (error) {
    console.error("Error fetching preview data:", error);
  }

  if (!page) return notFound();

  // In Preview Mode, fetchDraftPageBySlug already normalizes 'draft' or 'content' into 'data'
  const displaySections = page.sections || [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-primary-orange text-white text-center py-2 z-[100] font-bold text-sm uppercase tracking-widest">
        Preview Mode: Viewing Draft Version
      </div>
      <div className="pt-10">
        <PageRenderer sections={displaySections} trips={trips} reviews={reviews} />
      </div>
      <FloatingSocialBar />
      <Footer />
    </div>
  );
}
