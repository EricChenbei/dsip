import LeadForm from "@/components/LeadForm";
import content from "@/data/content.json";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Contact the Research Team
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We respond to inquiries regarding lot-specific documentation, batch availability, and shipping constraints. 
              Our team does not provide dosing, protocol, or human-use guidance.
            </p>

            <div className="bg-[#F5F5F7] rounded-xl p-8 border border-gray-200 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp Support</h3>
              <p className="text-sm text-gray-600 mb-6">
                For the fastest response regarding existing orders or immediate batch questions, reach out via WhatsApp.
              </p>
              <a
                href={`https://wa.me/${content.global.whatsappNumber}?text=${encodeURIComponent(content.global.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors shadow-sm"
              >
                Open WhatsApp Chat
              </a>
            </div>

            <div className="text-sm text-gray-500 border-l-4 border-gray-200 pl-4">
              <p>Business Hours: Monday - Friday (EST)</p>
              <p className="mt-2">All product sales are restricted to laboratory research use only.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send an Inquiry</h2>
            <LeadForm sourcePage="Contact Page" />
          </div>

        </div>

      </div>
    </div>
  );
}
