import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import Footer from "@/components/Footer/page"; // Importing from your component path

// Helper component for the article bars
const ArticleItem = ({ title }: { title: string }) => (
  <div className="group flex items-center justify-between bg-[#c2c9e3] p-5 rounded-xl cursor-pointer hover:bg-[#b4bdda] transition-all mb-3 border border-transparent active:scale-[0.99]">
    <span className="text-xl font-bold text-gray-800">{title}</span>
    <ArrowRight className="text-gray-800 transition-transform group-hover:translate-x-1" size={24} />
  </div>
);

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100">
      <main className="max-w-5xl mx-auto px-6 pt-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-4">
          Help Center / <span className="font-semibold text-gray-900">How to Print Video</span>
        </nav>

        {/* Main Heading */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Create a New Document
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
            Follow these steps to start a new document in Printable. Whether you're creating a flyer, 
            brochure, or presentation, these instructions will guide you through the process.
          </p>
        </header>

        {/* Video Feature Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl group mb-16 aspect-video bg-gray-100">
          <img 
            src="/videoo.png" // Ensure your image is in the public folder
            alt="Workspace preview" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
            
          </div>
        </div>

        {/* Key Steps List */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Steps</h2>
          <div className="space-y-3 text-lg text-gray-700 font-medium">
            <p>0:00 - Introduction</p>
            <p>0:15 - Selecting Your Document</p>
            <p>0:30 - Adjusting Print Settings</p>
            <p>0:45 - Initiating the Print Job</p>
            <p>1:00 - Troubleshooting Common Issues</p>
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <ArticleItem title="Troubleshooting Print Issues" />
          <ArticleItem title="Troubleshooting Common Issues" />
        </section>
      </main>

      {/* Footer component from @/components/Footer/page */}
      <Footer />
    </div>
  );
}