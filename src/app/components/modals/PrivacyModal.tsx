// components/PrivacyModal.tsx
import React from "react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="bg-[#262626] w-full max-w-2xl rounded-lg shadow-lg relative p-6 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
          aria-label="Close"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="mb-4">
          At Bluemines, we take your privacy seriously. This Privacy Policy
          describes how your personal information is collected, used, and shared
          when you visit or register at <strong>https://bluemines.xyz</strong>.
        </p>
        <p className="mb-2 font-semibold">Information We Collect:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Personal identification information (name, email address, etc.)
          </li>
          <li>Technical data such as IP address, browser type, etc.</li>
        </ul>
        <p className="mb-2 font-semibold">How We Use Your Information:</p>
        <ul className="list-disc list-inside mb-4">
          <li>To register your account</li>
          <li>To improve our services</li>
          <li>To communicate updates or offers</li>
        </ul>
        <p className="mb-2 font-semibold">Your Rights:</p>
        <ul className="list-disc list-inside mb-4">
          <li>You have the right to access, update, or delete your data</li>
          <li>
            You can contact us anytime for support at privacy@bluemines.xyz
          </li>
        </ul>
        <p className="text-sm text-gray-500">Last updated: May 23, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyModal;
