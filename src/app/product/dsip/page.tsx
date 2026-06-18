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

            {/* Purchase Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Quantity</h3>
              <div className="space-y-4">
                {content.shop.products.map((item) => (
                  <div key={item.id} className={`p-4 border rounded-lg ${item.isPopular ? 'border-black bg-gray-50' : 'border-gray-200'} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        {item.isPopular && <span className="text-[10px] uppercase font-bold bg-black text-white px-2 py-0.5 rounded-full">Popular</span>}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <div className="flex flex-col sm:items-end w-full sm:w-auto">
                      <div className="flex items-baseline gap-2 mb-2 sm:mb-0">
                        <span className="text-lg font-bold text-gray-900">${item.salePrice.toFixed(2)}</span>
                        <span className="text-sm text-gray-400 line-through">${item.regularPrice.toFixed(2)}</span>
                      </div>
                      <Link
                        href={`/checkout?item=${item.id}`}
                        className="w-full sm:w-auto text-center px-6 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors mt-2"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                ))}
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
