'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Phone, Mail, Users, Bed, Train, 
  ChevronRight, Calendar, MapPin, CheckCircle2,
  Loader2, AlertCircle
} from 'lucide-react';

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    tripName: searchParams.get('trip') || '',
    date: searchParams.get('date') || '',
    name: '',
    phone: '',
    email: '',
    participants: 1,
    roomSharing: 'Triple Sharing',
    trainOption: 'No',
    participantsList: [{ name: '', phone: '', govId: '' }] as { name: string, phone: string, govId: string }[]
  });

  // Sync participants list when count changes
  useEffect(() => {
    const count = formData.participants;
    setFormData(prev => {
      const newList = [...prev.participantsList];
      if (newList.length < count) {
        for (let i = newList.length; i < count; i++) {
          newList.push({ name: '', phone: '', govId: '' });
        }
      } else if (newList.length > count) {
        newList.splice(count);
      }
      return { ...prev, participantsList: newList };
    });
  }, [formData.participants]);

  const handleParticipantChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newList = [...prev.participantsList];
      newList[index] = { ...newList[index], [field]: value };
      return { ...prev, participantsList: newList };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking-forms/public-submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };


  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-6 space-y-6"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Booking Received!</h2>
        <p className="text-slate-600 max-w-md mx-auto font-medium">
          Thank you for booking with YouthCamping. Our team will contact you shortly on WhatsApp to confirm your spot.
        </p>
        <div className="pt-8">
          <button 
            onClick={() => router.push('/')}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
          Complete Your <br/><span className="text-emerald-600">Adventure Booking</span>
        </h1>
        <div className="flex flex-wrap gap-4 pt-2">
          {formData.tripName && (
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700">
              <MapPin className="w-3 h-3" /> {formData.tripName}
            </div>
          )}
          {formData.date && (
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700">
              <Calendar className="w-3 h-3" /> {formData.date}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input 
              required
              type="text"
              placeholder="Full Name"
              className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                required
                type="tel"
                placeholder="Phone / WhatsApp"
                className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="email"
                placeholder="Email Address"
                className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-slate-50 p-6 rounded-[32px] space-y-6">
          {/* Participants Count */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
              <Users className="w-3 h-3" /> Number of Participants
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, '5+'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData({...formData, participants: num === '5+' ? 5 : num as number})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    (num === '5+' ? formData.participants >= 5 : formData.participants === num)
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-600'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Individual Participant Details */}
          <AnimatePresence>
            {formData.participantsList.map((p, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4 border-t border-slate-200"
              >
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                    Traveler {idx + 1} {idx === 0 && "(Primary)"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    placeholder="Full Name (as per ID)"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-600 font-medium text-sm"
                    value={p.name}
                    onChange={(e) => handleParticipantChange(idx, 'name', e.target.value)}
                    required
                  />
                  <input 
                    placeholder="Aadhar / Gov ID Number"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-emerald-600 font-medium text-sm"
                    value={p.govId}
                    onChange={(e) => handleParticipantChange(idx, 'govId', e.target.value)}
                    required
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
              <Bed className="w-3 h-3" /> Room Sharing Preference
            </label>
            <select 
              className="w-full bg-white border-2 border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-600 transition-all font-bold text-slate-700 appearance-none"
              value={formData.roomSharing}
              onChange={(e) => setFormData({...formData, roomSharing: e.target.value})}
            >
              <option>Twin Sharing</option>
              <option>Triple Sharing</option>
              <option>Quad Sharing</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
              <Train className="w-3 h-3" /> Train Travel Required?
            </label>
            <div className="flex gap-4">
              {['Yes', 'No'].map((opt) => (
                <label key={opt} className="flex-1 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="train" 
                    className="hidden" 
                    checked={formData.trainOption === opt}
                    onChange={() => setFormData({...formData, trainOption: opt})}
                  />
                  <div className={`py-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    formData.trainOption === opt 
                      ? 'bg-white border-emerald-600 shadow-md ring-4 ring-emerald-50' 
                      : 'bg-slate-100/50 border-transparent text-slate-400 grayscale'
                  }`}>
                    <span className="font-black uppercase text-xs tracking-tighter">{opt}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
          >
            <AlertCircle className="w-4 h-4" /> {error}
          </motion.div>
        )}

        <button 
          disabled={loading}
          className="w-full bg-slate-900 text-white rounded-[24px] py-6 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-slate-800 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Confirm Booking <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <p className="text-center mt-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
        Secure Booking by YouthCamping 🏕️
      </p>
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>}>
        <BookingForm />
      </Suspense>
    </main>
  );
}
