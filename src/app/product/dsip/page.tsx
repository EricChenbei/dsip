import Image from "next/image";
import Link from "next/link";
import content from "@/data/content.json";
import LeadForm from "@/components/LeadForm";

export default function ProductPage() {
  const { product } = content;

  return (
    <div className="bg-[#F5F5F7] min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Research Peptides</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
              <Image
                src="/images/ecommerce_product_card_1781634042530.png"
                alt="DSIP research peptide vial"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {product.badges.map((badge, idx) => (
                <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {badge}
                </span>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h2>
              <dl className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inquiry required</h3>
              <p className="text-sm text-gray-600 mb-6">{product.ctaBlock.text}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#inquiry-form"
                  className="inline-flex justify-center items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
                >
                  {product.ctaBlock.primaryBtn}
                </a>
                <a
                  href={`https://wa.me/${content.global.whatsappNumber}?text=${encodeURIComponent("Hello, I would like to request the COA and documentation for DSIP Research Peptide.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  {product.ctaBlock.secondaryBtn}
                </a>
              </div>
            </div>

            {/* Inquiry Form directly on product page */}
            <div id="inquiry-form" className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Research Inquiry</h2>
              <LeadForm sourcePage="Product Detail: DSIP" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
