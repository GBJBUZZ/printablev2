"use client";

export default function VerificationSuccessPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/kyc-bg.png')" }} // replace if needed
    >
      {/* Success Card */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl px-8 py-6 text-center">
        {/* Title */}
        <h2 className=" text-lg text-[20px] font-semibold text-gray-900">
          Documents submitted successfully!
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-700 mt-2">
          Congratulations! You’re all set to start managing your print shop on
          Printable.
        </p>

        {/* Info Box */}
        <div className="mt-4 flex gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
          {/* Icon */}
          <div className="text-blue-600 mt-0.5">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.038.02l.041.02M12 8.25h.008v.008H12V8.25zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-medium text-blue-700">
              Verification Timeline
            </p>
            <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">
              Document verification typically takes 24–48 hours. You’ll receive
              an email notification once the verification is complete.
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="mt-5 w-full rounded-full bg-green-500 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition">
          Go to Dashboard
        </button>
      </div>
    </main>
  );
}
