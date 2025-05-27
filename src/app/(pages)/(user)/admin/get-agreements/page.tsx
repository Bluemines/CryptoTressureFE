'use client'

import { useGetAgreement } from '@/api/admin/useAdmin'

const AgreementPage = () => {
  const { data, isLoading, isError, error } = useGetAgreement()

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading agreement...</div>
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load agreement: {(error as any)?.message || 'Unknown error'}
      </div>
    )
  }

  const agreements = data?.data || []
  const latestAgreement = agreements[0]

  return (
    <div className="min-h-screen bg-[#121212] py-10 px-4 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold border-b border-gray-700 pb-2">📄 MLM User Agreement</h1>

        {latestAgreement ? (
          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow space-y-4">
            <div className="text-gray-300 space-y-4">
              <p><strong>Effective Date:</strong> [Insert Date]</p>
              <p><strong>Company:</strong> [Your Company Name]</p>
              <p>
                By registering on our platform, you (“User”) agree to the following terms and conditions:
              </p>

              <div>
                <h2 className="text-xl font-semibold">1. Role & Eligibility</h2>
                <p>You join as an <strong>independent distributor</strong> (not an employee). You must be <strong>18+</strong> and provide accurate information.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">2. Responsibilities</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Promote ethically, following the official compensation plan.</li>
                  <li>Keep your account and login information secure.</li>
                  <li>Refrain from fraudulent, unethical, or misleading activities.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold">3. Commissions</h2>
                <p>
                  Earnings are based on our official <strong>MLM compensation plan</strong>, which may include referral bonuses, level income, and team rewards. We may update the plan with prior notice.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">4. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your account for violations of these terms or unethical behavior.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">5. Liability</h2>
                <p>
                  We are not liable for indirect, incidental, or consequential damages. Use of the platform is at your own risk.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">6. Governing Law</h2>
                <p>
                  This agreement is governed by the laws of <strong>[Your Country]</strong>.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p>🖊️ <strong>[Your Company Name]</strong></p>
                <p>📅 <strong>[Insert Date]</strong></p>
              </div>

              <p className="text-sm text-gray-500 italic">
                Created on: {new Date(latestAgreement.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">No agreement found.</div>
        )}
      </div>
    </div>
  )
}

export default AgreementPage
