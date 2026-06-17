"use client";

import { useState } from "react";
import content from "@/data/content.json";
import { Loader2 } from "lucide-react";
import PhoneInput, { Country, getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function LeadForm({ sourcePage = "General Inquiry" }: { sourcePage?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState<string>();
  const [phoneCountry, setPhoneCountry] = useState<Country>("US");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.whatsapp = phone || "";

    if (!data.whatsapp) {
      setStatus("error");
      setErrorMessage("Please enter a valid WhatsApp number.");
      return;
    }

    // Basic client validation is handled by 'required' attributes, but we ensure checkboxes are checked
    if (!data.qualifiedBuyer || !data.logisticsConsent || !data.privacyAccepted) {
      setStatus("error");
      setErrorMessage(content.form.errorMessage);
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sourcePage }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-medium mb-2">Inquiry Submitted</h3>
        <p className="text-sm">{content.form.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name (Optional)</label>
          <div className="mt-1">
            <input type="text" name="fullName" id="fullName" className="py-3 px-4 block w-full shadow-sm focus:ring-black focus:border-black border-gray-300 rounded-md bg-white border" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
          <div className="mt-1">
            <input type="email" name="email" id="email" required className="py-3 px-4 block w-full shadow-sm focus:ring-black focus:border-black border-gray-300 rounded-md bg-white border" />
          </div>
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp Number *</label>
          <div className="mt-1">
            <PhoneInput
              international
              country={phoneCountry}
              onCountryChange={(country) => {
                if (country) {
                  setPhoneCountry(country);
                  setPhone(`+${getCountryCallingCode(country)}`);
                }
              }}
              value={phone}
              onChange={setPhone}
              className="phone-input-wrapper"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region *</label>
          <div className="mt-1">
            <select name="country" id="country" required className="py-3 px-4 block w-full shadow-sm focus:ring-black focus:border-black border-gray-300 rounded-md bg-white border">
              <option value="">Select a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="NZ">New Zealand</option>
              <optgroup label="Europe">
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="NL">Netherlands</option>
                <option value="CH">Switzerland</option>
                <option value="SE">Sweden</option>
                <option value="NO">Norway</option>
                <option value="DK">Denmark</option>
                <option value="FI">Finland</option>
                <option value="IE">Ireland</option>
                <option value="AT">Austria</option>
                <option value="BE">Belgium</option>
              </optgroup>
              <optgroup label="Americas">
                <option value="MX">Mexico</option>
                <option value="BR">Brazil</option>
                <option value="AR">Argentina</option>
                <option value="CL">Chile</option>
              </optgroup>
              <optgroup label="Asia Pacific & Middle East">
                <option value="JP">Japan</option>
                <option value="KR">South Korea</option>
                <option value="SG">Singapore</option>
                <option value="AE">United Arab Emirates</option>
                <option value="SA">Saudi Arabia</option>
                <option value="IL">Israel</option>
              </optgroup>
              <optgroup label="Other">
                <option value="ZA">South Africa</option>
                <option value="Other">Other Region</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700">Product Interest *</label>
          <div className="mt-1">
            <select name="productInterest" id="productInterest" required className="py-3 px-4 block w-full shadow-sm focus:ring-black focus:border-black border-gray-300 rounded-md bg-white border">
              <option value="">Select interest</option>
              <option value="DSIP Research Peptide">DSIP Research Peptide</option>
              <option value="Volume inquiry">Volume inquiry</option>
              <option value="COA request">COA request</option>
              <option value="Shipping question">Shipping question</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
          <div className="mt-1">
            <textarea id="message" name="message" rows={4} className="py-3 px-4 block w-full shadow-sm focus:ring-black focus:border-black border border-gray-300 rounded-md bg-white"></textarea>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-start">
          <div className="flex-shrink-0 flex items-center h-5">
            <input id="qualifiedBuyer" name="qualifiedBuyer" type="checkbox" required className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="qualifiedBuyer" className="font-medium text-gray-700">I confirm I am inquiring for laboratory research purposes only and not for human or veterinary use. *</label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 flex items-center h-5">
            <input id="logisticsConsent" name="logisticsConsent" type="checkbox" required className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="logisticsConsent" className="font-medium text-gray-700">I agree to receive inquiry and logistics messages related to my request. *</label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 flex items-center h-5">
            <input id="privacyAccepted" name="privacyAccepted" type="checkbox" required className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="privacyAccepted" className="font-medium text-gray-700">I have read the Privacy Notice and understand how my information will be used. *</label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 flex items-center h-5">
            <input id="marketingConsent" name="marketingConsent" type="checkbox" className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="marketingConsent" className="text-gray-500">I agree to receive product updates and educational materials. I can opt out at any time. (Optional)</label>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs text-gray-500 mb-4">{content.form.microcopy}</p>
        
        {status === "error" && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === "loading" && <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />}
          {content.form.submitBtn}
        </button>
      </div>
    </form>
  );
}
