"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import content from "@/data/content.json";
import { Loader2, ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("item");
  
  const product = content.shop.products.find(p => p.id === itemId) || content.shop.products[0];
  const { shipping, cryptoWallet } = content.shop;

  const subtotal = product.salePrice;
  const shippingCost = subtotal >= shipping.freeThreshold ? 0 : shipping.flatRate;
  const total = subtotal + shippingCost;

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(cryptoWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...data, 
          productId: product.id,
          productName: product.name,
          amount: total
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const errorData = await response.json();
        setStatus("error");
        setErrorMessage(errorData.error || "Something went wrong. Please try again later.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Submitted</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We have received your payment details and will verify the transaction hash shortly. You will receive an email confirmation once verified.
          </p>
          <Link href="/" className="inline-flex justify-center w-full px-4 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/product/dsip" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Product
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Shipping Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="fullName" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input type="text" name="address" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" name="city" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                    <input type="text" name="state" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input type="text" name="zip" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select name="country" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black bg-white">
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="EU">European Union</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Crypto Payment Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment (USDT ERC20)</h2>
                <p className="text-sm text-gray-500 mb-6">For privacy and security, we currently only accept USDT via the Ethereum (ERC20) network.</p>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col items-center mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-4">Please send exactly <strong className="text-lg">${total.toFixed(2)} USDT</strong></p>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
                    <QRCodeSVG value={`ethereum:${cryptoWallet}`} size={160} />
                  </div>
                  
                  <div className="w-full max-w-sm mt-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1 text-center">USDT (ERC20) Deposit Address</label>
                    <div className="flex mt-1">
                      <input 
                        type="text" 
                        readOnly 
                        value={cryptoWallet} 
                        className="w-full text-sm px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-white text-gray-600 truncate"
                      />
                      <button 
                        type="button"
                        onClick={handleCopy}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        {copied ? <span className="text-sm">Copied!</span> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Transaction Hash (TxHash) *</label>
                  <p className="text-xs text-gray-500 mb-3">After sending your payment, please paste the transaction hash below so we can verify your order.</p>
                  <input 
                    type="text" 
                    name="txHash" 
                    required 
                    placeholder="e.g. 0x123abc..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-black focus:border-black font-mono text-sm" 
                  />
                </div>

              </div>

            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Research Use Only</p>
                </div>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>

              {status === "error" && (
                <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                form="checkout-form"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === "loading" && <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />}
                Confirm Payment & Submit Order
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting your order, you confirm that these products are for laboratory research use only.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-gray-400" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
