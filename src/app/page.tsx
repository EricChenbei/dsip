import Image from "next/image";
import Link from "next/link";
import content from "@/data/content.json";

export default function Home() {
  const { hero, valueProps } = content.home;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full pt-16 md:pt-32 pb-20 md:pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                {hero.headline}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 font-light">
                {hero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors shadow-sm"
                >
                  {hero.primaryCta}
                </Link>
                <Link
                  href="/product/dsip"
                  className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                >
                  {hero.secondaryCta}
                </Link>
              </div>
              <p className="text-xs text-gray-500 max-w-lg">
                {hero.disclaimer}
              </p>
            </div>
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/hero_product_render_1781634032861.png"
                alt="DSIP research peptide vial and documentation mockup, for laboratory research use only."
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              A better procurement experience
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {prop.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            Ready to review our batches?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Contact our research support team to request COA documents, check shipping availability, or discuss a volume order.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://wa.me/${content.global.whatsappNumber}?text=${encodeURIComponent(content.global.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 shadow-sm transition-colors"
            >
              WhatsApp Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
