"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { Review } from "@/types";
import { normalizeImageUrl } from "@/lib/api";

interface TripReviewsProps {
  reviews: Review[];
}

const getRelativeTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMonths = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
  
  if (diffInMonths <= 0) return "Just now";
  if (diffInMonths === 1) return "1 month ago";
  return `${diffInMonths} months ago`;
};

export default function TripReviews({ reviews }: TripReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-20 border-t border-zinc-100">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-black text-navy uppercase italic tracking-tighter">Reviews</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <ReviewCard key={review.id || review._id} review={review} />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowReadMore = review.comment.length > 150;
  const displayedComment = isExpanded ? review.comment : review.comment.slice(0, 150) + (shouldShowReadMore ? "..." : "");

  return (
    <div className="bg-white border border-zinc-100 rounded-[32px] p-8 space-y-6 transition-all hover:shadow-xl hover:border-primary-orange/20">
      {/* Header: User Info */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-100 border-2 border-white shadow-sm">
          <Image 
            src={normalizeImageUrl(review.userImage) || "https://i.pravatar.cc/150?u=default"} 
            alt={review.userName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h4 className="font-black text-navy uppercase text-sm tracking-tight">{review.userName}</h4>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              {review.tripType || "Joined Group Trip"}
            </span>
          </div>
          <Link 
            href={review.tripId ? `/trips/${review.tripId}` : "#"}
            className="flex items-center gap-1 text-[11px] font-bold text-primary-orange hover:underline uppercase tracking-wide group"
          >
            Booked: {review.tripName}
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Rating & Time */}
      <div className="flex items-center gap-3">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3.5 h-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200"}`} 
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          {getRelativeTime(review.createdAt)}
        </span>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <p className="text-zinc-600 text-sm font-medium leading-relaxed">
          {displayedComment}
          {shouldShowReadMore && !isExpanded && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-primary-orange font-bold ml-1 hover:underline cursor-pointer"
            >
              Read More
            </button>
          )}
        </p>
      </div>

      {/* Photo Grid (2x2) */}
      {review.photos && review.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2 aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
           {review.photos.slice(0, 4).map((photo, idx) => (
             <div key={idx} className="relative w-full h-full bg-zinc-50 overflow-hidden group">
                <Image 
                  src={normalizeImageUrl(photo)} 
                  alt={`Review photo ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
             </div>
           ))}
           {/* Placeholder for remaining spots if less than 4 photos */}
           {[...Array(Math.max(0, 4 - review.photos.length))].map((_, i) => (
             <div key={`empty-${i}`} className="bg-zinc-50 border border-zinc-100" />
           ))}
        </div>
      )}
    </div>
  );
}
