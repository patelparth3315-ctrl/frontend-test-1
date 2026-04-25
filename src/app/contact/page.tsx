import { Mail, Phone, MapPin, Camera, Link as LinkIcon, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      <section className="py-24 px-6 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-6 block">Get in touch</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
                LET&apos;S PLAN YOUR <br />
                <span className="italic font-serif font-normal text-zinc-500">Next Escape</span>
              </h1>
              <p className="text-xl text-zinc-400 font-light max-w-xl mb-12">
                Have a question about an expedition or need a custom itinerary? Our curators are here to help you design the perfect journey.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Email Us</p>
                    <p className="text-lg font-medium">hello@youthcamping.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Call Us</p>
                    <p className="text-lg font-medium">+91 99242 46267</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Office</p>
                    <p className="text-lg font-medium">Money Plant High Street, A 738, Jagatpur Rd, Gota, Ahmedabad, Gujarat 382470</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 mt-16">
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"><Camera className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"><LinkIcon className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"><Send className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="bg-white p-10 md:p-16 rounded-[60px] text-black">
              <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">SEND A MESSAGE</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                    <input type="text" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 focus:ring-2 focus:ring-black outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
                    <input type="email" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 focus:ring-2 focus:ring-black outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Interested In</label>
                  <select className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 focus:ring-2 focus:ring-black outline-none transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Spiti Valley Expedition</option>
                    <option>Ladakh Road Trip</option>
                    <option>Kashmir Autumn Tour</option>
                    <option>Custom Itinerary</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Message</label>
                  <textarea rows={4} className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 focus:ring-2 focus:ring-black outline-none transition-all" placeholder="Tell us about your dream trip..."></textarea>
                </div>
                <button className="w-full py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl">
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
