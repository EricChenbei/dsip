import Link from "next/link";
import content from "@/data/content.json";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              DSIP Research
            </span>
            <p className="mt-2 text-sm text-gray-500">
              Precision-led laboratory procurement.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                  Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
                  Terms / Research Use Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                  Submit Inquiry
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${content.global.whatsappNumber}?text=${encodeURIComponent(content.global.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 text-center md:text-left max-w-2xl font-medium">
            {content.global.footerDisclaimer}
          </p>
          <p className="text-xs text-gray-400 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} DSIP Research. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
