import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: [Date]</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            1. Introduction
          </h2>
          <p className="text-gray-600">
            Welcome to <strong>AreYouFiler</strong>. These Terms and Conditions
            govern your access to and use of our online dashboard platform
            ("Service"), which allows law firms and legal professionals to
            manage operations efficiently. By using our platform, you agree to
            abide by these terms. Please read them carefully.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            2. Definitions
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>
              <strong>"Company"</strong> refers to AreYouFiler.
            </li>
            <li>
              <strong>"User"</strong> refers to any individual or entity using
              the platform.
            </li>
            <li>
              <strong>"Service"</strong> refers to the dashboard and all related
              tools, integrations, and services offered.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            3. Eligibility
          </h2>
          <p className="text-gray-600">
            Only law firms, registered legal entities, or their authorized
            personnel are eligible to use this platform. You represent that you
            are legally allowed to enter into these Terms on behalf of your
            firm.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            4. Services Provided
          </h2>
          <p className="text-gray-600">
            AreYouFiler offers a centralized dashboard where law firms can
            manage:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Client records and documentation</li>
            <li>Case and appointment scheduling</li>
            <li>Internal communications</li>
            <li>Task and team management</li>
            <li>Data storage and secure access control</li>
            <li>Third-party integrations and reports</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            5. User Responsibilities
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Keep login credentials confidential.</li>
            <li>Ensure all information provided is accurate and up-to-date.</li>
            <li>
              Use the Service only for lawful activities within your firm.
            </li>
            <li>
              Notify us immediately if you suspect unauthorized access to your
              account.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            6. Data Privacy
          </h2>
          <p className="text-gray-600">
            We respect your privacy. All data managed through our platform is
            stored securely and used in accordance with our{" "}
            <a href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </a>
            . AreYouFiler does not share, sell, or expose client data without
            explicit consent.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            7. Payment & Subscription
          </h2>
          <p className="text-gray-600">
            Certain features of the platform may be offered as part of a paid
            subscription. You agree to pay all fees in accordance with the
            pricing plan you select. Payments are non-refundable unless
            otherwise stated.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            8. Account Termination
          </h2>
          <p className="text-gray-600">
            We reserve the right to suspend or terminate access at any time due
            to breach of terms, suspected fraud, abuse, or inactivity. You may
            also cancel your account anytime; however, data retention policies
            may apply.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            9. Limitation of Liability
          </h2>
          <p className="text-gray-600">
            AreYouFiler is not liable for any direct or indirect damages arising
            from the use or inability to use the Service. You use the platform
            at your own risk. We do not guarantee legal outcomes based on
            platform usage.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            10. Modifications to Terms
          </h2>
          <p className="text-gray-600">
            We may modify these Terms at any time. Any changes will be posted on
            this page, and continued use of the platform after changes indicates
            acceptance.
          </p>
        </section>

        <footer className="text-sm text-gray-500 mt-10">
          <p>
            If you have any questions or concerns about these Terms, feel free
            to contact us at{" "}
            <a
              href="mailto:support@areyoufiler.com"
              className="text-blue-600 underline"
            >
              support@areyoufiler.com
            </a>
            .
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} AreYouFiler. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;
