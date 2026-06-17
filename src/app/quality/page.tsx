import Image from "next/image";
import content from "@/data/content.json";
import LeadForm from "@/components/LeadForm";

export default function QualityPage() {
  const { quality } = content;

  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            {quality.headline}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {quality.body}
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-20 bg-gray-50 flex items-center justify-center">
           <Image
              src="/images/coa_documentation_visual_1781634061605.png"
              alt="DSIP Certificate of Analysis and documentation mockup"
              fill
              className="object-cover"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {quality.cards.map((card, idx) => (
            <div key={idx} className="bg-[#F5F5F7] rounded-xl p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Request Documentation</h2>
            <p className="mt-2 text-sm text-gray-500">Ask our team for lot-specific COA files or technical data.</p>
          </div>
          <LeadForm sourcePage="Quality / COA Request" />
        </div>

      </div>
    </div>
  );
}
