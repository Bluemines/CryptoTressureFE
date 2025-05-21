const TableSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="overflow-auto rounded-lg border border-gray-700">
      <table className="min-w-full text-sm text-left text-gray-300 bg-[#262626] animate-pulse">
        <thead className="text-xs uppercase bg-[#262626] text-gray-400">
          <tr>
            {[...Array(cols)].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <div className="h-3 w-16 bg-gray-700 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-700">
              {[...Array(cols)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="h-4 bg-gray-700 rounded max-w-[80%]"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableSkeleton