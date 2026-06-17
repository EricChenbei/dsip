import Image from "next/image";
import content from "@/data/content.json";
import LeadForm from "@/components/LeadForm";

export default function BlackFridayPage() {
  const { blackFriday } = content;

  return (
    <div className="bg-[#111111] min-h-screen pt-16 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compliance Banner */}
        <div className="bg-gray-800 text-gray-300 text-xs text-center py-2 px-4 rounded-md mb-8">
          {blackFriday.complianceBanner}
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase block mb-3">
              {blackFriday.title}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
              {blackFriday.headline}
            </h1>
            <p className="text-lg text-gray-400 mb-8 font-light">
              {blackFriday.subheadline}
            </p>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-300">
                {blackFriday.offerStrip}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#bf-inquiry-form"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors shadow-sm"
              >
                {blackFriday.ctas.primary}
              </a>
              <a
                href={`https://wa.me/${content.global.whatsappNumber}?text=${encodeURIComponent("Hello, I have a Black Friday bundle inquiry for DSIP.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-white hover:bg-gray-800 transition-colors shadow-sm"
              >
                {blackFriday.ctas.secondary}
              </a>
            </div>
          </div>
          <div className="relative aspect-[2/1] w-full rounded-xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800">
            <Image
              src="/images/black_friday_banner_1781634050040.png"
              alt="Black Friday Research Procurement"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Features */}
        <div className="border-t border-gray-800 pt-16 mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">{blackFriday.featuresTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {blackFriday.features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="ml-3 text-sm text-gray-400">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <div id="bf-inquiry-form" className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-gray-200">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Black Friday Inquiry</h2>
            <p className="mt-2 text-sm text-gray-500">Secure batch availability during our procurement window.</p>
          </div>
          <LeadForm sourcePage="Black Friday Landing Page" />
        </div>

      </div>
    </div>
  );
}
