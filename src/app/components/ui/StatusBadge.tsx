// components/StatusBadge.tsx
type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  let colorClasses = '';

  switch (status.toLowerCase()) {
    case 'completed':
      colorClasses = 'bg-[#072a2f] text-[#00CFE8]';
      break;
    case 'pending':
      colorClasses = 'bg-[#302215] text-[#FF9F43]';
      break;
    case 'declined':
      colorClasses = 'bg-[#2c0d11] text-[#EC1E2D] border border-red-600';
      break;
    case 'approved':
      colorClasses = 'bg-[#1e3d2c] text-[#28C76F]'
      break;
    case 'rejected':
      colorClasses = 'bg-[#462321] text-[#F04438]'
      break;
    default:
      colorClasses = 'bg-gray-100 text-gray-600 border border-gray-400';
      break;
  }

  return (
    <div
      className={`px-3 py-1 rounded text-xs font-medium inline-block ${colorClasses}`}
    >
      {status}
    </div>
  );
}
