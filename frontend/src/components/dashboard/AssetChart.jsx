import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * Enhanced Asset Chart Component
 * Features: Gradient bars, custom tooltip, responsive design
 */
const AssetChart = ({ data, loading = false }) => {
  // Color palette for bars
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // yellow
    '#ef4444', // red
    '#8b5cf6', // purple
    '#06b6d4', // cyan
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="
          bg-white px-4 py-3 
          rounded-xl shadow-strong 
          border-2 border-gray-100
        ">
          <p className="text-sm font-bold text-gray-900 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-lg font-bold text-blue-600">
            {payload[0].value} {payload[0].value === 1 ? 'Asset' : 'Assets'}
          </p>
        </div>
      );
    }
    return null;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="
        w-full h-80 
        flex flex-col items-center justify-center
        text-center
      ">
        <div className="
          w-20 h-20 
          bg-gray-100 rounded-2xl
          flex items-center justify-center
          mb-4
        ">
          <svg 
            className="w-10 h-10 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            />
          </svg>
        </div>
        <p className="text-gray-600 font-medium mb-2">
          No data available
        </p>
        <p className="text-sm text-gray-500">
          Create some assets to see the chart
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <defs>
            {colors.map((color, index) => (
              <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb"
            vertical={false}
          />
          
          <XAxis 
            dataKey="category" 
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            allowDecimals={false}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          
          <Bar 
            dataKey="count" 
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#gradient${index % colors.length})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetChart;