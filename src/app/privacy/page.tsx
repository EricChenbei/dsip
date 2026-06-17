export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Notice</h1>
        <div className="prose prose-sm text-gray-600">
          <p className="mb-4">
            <strong>[TODO: LEGAL REVIEW REQUIRED]</strong> This is a placeholder for the official Privacy Notice.
            Before the site goes live, this page must be updated by legal counsel to reflect the actual data collection
            practices of the site, including how email addresses and WhatsApp numbers are processed, stored, and protected.
          </p>
          <p className="mb-4">
            We collect the following personal information when you submit an inquiry:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Name (optional)</li>
            <li>Email Address</li>
            <li>WhatsApp Number</li>
            <li>Country / Region</li>
            <li>Inquiry Details</li>
          </ul>
          <p className="mb-4">
            Your information is used strictly to fulfill your request, provide lot-specific documentation, and communicate shipping eligibility.
            If you opt-in to marketing communications, you may receive promotional updates, which you can opt out of at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
