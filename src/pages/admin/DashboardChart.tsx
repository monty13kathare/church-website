// components/admin/DashboardChart.tsx
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface DashboardChartProps {
  timeRange: string;
}

const DashboardChart = ({ timeRange }: DashboardChartProps) => {
  // Generate mock data based on time range
  const generateData = () => {
    const data = [];
    let days = 7;
    
    if (timeRange === '30d') days = 30;
    if (timeRange === '90d') days = 90;
    if (timeRange === 'ytd') days = 365;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.floor(Math.random() * 10000) + 5000,
        likes: Math.floor(Math.random() * 1000) + 200,
        comments: Math.floor(Math.random() * 200) + 50,
        subscribers: Math.floor(Math.random() * 100) + 20,
      });
    }
    
    return data;
  };

  const data = generateData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm border border-amber-900/30 rounded-xl p-4 shadow-2xl">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: <span className="font-bold">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value:any) => `${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="views" 
          stroke="#f59e0b" 
          strokeWidth={2}
          fill="url(#colorViews)"
          fillOpacity={1}
        />
        <Area 
          type="monotone" 
          dataKey="likes" 
          stroke="#10b981" 
          strokeWidth={2}
          fill="url(#colorLikes)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;