import React from 'react';
import { MapPin, Phone, Clock, ArrowUpRight, Bike, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer id="location-section" className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 ring-2 ring-emerald-500/50 shrink-0">
                <img
                  src={RESTAURANT_INFO.logo}
                  alt="Northern Cuisine Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                Northern Cuisine
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              {RESTAURANT_INFO.tagline}. Authentic flavors, fresh ingredients, hygienic preparation, and speedy online order slip dispatch.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs">
              <Bike className="w-4 h-4" />
              <span>Standard DC: Rs. 100/- only</span>
            </div>
          </div>

          {/* Col 2: Restaurant Timings & Delivery */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Operating Hours
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Monday – Sunday</span>
              </div>
              <p className="text-neutral-400 pl-6">
                12:00 PM – 01:00 AM (Midnight)
              </p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[11px]">
                  ● Kitchen Active & Accepting Orders
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Location & Maps */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Location & Map
            </h4>
            <p className="text-neutral-400 text-xs">
              Visit us for takeout or dine-in, or track our exact pin on Google Maps:
            </p>
            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/80 transition-colors text-xs font-medium cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Open Google Maps Pin</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>

          {/* Col 4: Quick Contact */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="space-y-2 text-neutral-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs">{RESTAURANT_INFO.secondaryPhone}</span>
              </div>

              {/* Clean WhatsApp trigger icon */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent('Salam Northern Cuisine! Mujhe order place krna hai.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all text-xs font-semibold cursor-pointer w-fit"
                  title="Direct WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} Northern Cuisine. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Fresh Halal Food</span>
            <span>·</span>
            <span>Catering & Events</span>
            <span>·</span>
            <span>Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
