import React from 'react';
import { Plus, Layout, Settings, Image as ImageIcon, Save, HelpCircle } from 'lucide-react';
import Footer from "@/components/Footer/page";

const CreateDocumentPage = () => {
  const steps = [
    {
      icon: <Plus className="w-6 h-6 text-gray-600" />,
      title: "1. Start a New Document",
      description: "Click the 'New Document' button on the dashboard to begin."
    },
    {
      icon: <Layout className="w-6 h-6 text-gray-600" />,
      title: "2. Select a Template (Optional)",
      description: "Print a test document to ensure your device is connected and working correctly."
    },
    {
      icon: <Settings className="w-6 h-6 text-gray-600" />,
      title: "3. Configure Document Settings",
      description: "Set the dimensions, orientation, and margins for your document."
    },
    {
      icon: <ImageIcon className="w-6 h-6 text-gray-600" />,
      title: "4. Add Content",
      description: "Add text, images, and other elements to your document."
    },
    {
      icon: <Save className="w-6 h-6 text-gray-600" />,
      title: "5. Save Your Document",
      description: "Save your document to access and edit it later"
    }
  ];

  const resources = [
    { title: "Troubleshooting Common Issues" },
    { title: "FAQs About Document Creation" }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        {/* Header Section */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create a New Document</h1>
          <p className="text-gray-600 leading-relaxed">
            Follow these steps to start a new document in Printable. Whether you're creating a flyer, brochure, or presentation, these instructions will guide you through the process.
          </p>
        </section>

        {/* Steps Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Steps to Create a New Document</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Optimizing Document Settings</h2>
          <p className="text-gray-600 leading-relaxed">
            Follow these steps to start a new document in Printable. Whether you're creating a flyer, brochure, or presentation, these instructions will guide you through the process.
          </p>
        </section>

        {/* Related Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Resources</h2>
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <div key={index} className="flex items-center gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default CreateDocumentPage;