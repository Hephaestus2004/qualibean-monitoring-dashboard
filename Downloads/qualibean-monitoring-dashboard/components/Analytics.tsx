import React, { useState } from 'react';
import Card from './common/Card';
import { Batch } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// Comprehensive mock data
const mockBatches: Batch[] = [
    {
        id: 'batch_a',
        name: 'Batch A - Morning Blend',
        passFailTrend: [
            { name: 'Hour 1', passed: 1200, failed: 110 },
            { name: 'Hour 2', passed: 1150, failed: 95 },
            { name: 'Hour 3', passed: 1250, failed: 120 },
            { name: 'Hour 4', passed: 1220, failed: 125 },
        ],
        beanDistribution: [
            { name: 'Arabica', value: 3000 },
            { name: 'Robusta', value: 1800 },
        ],
        roastDistribution: [
            { name: 'Light', value: 1000 },
            { name: 'Medium', value: 3500 },
            { name: 'Dark', value: 300 },
        ],
        binWeights: [
            { time: '08:00', passWeight: 180, failWeight: 16.5 },
            { time: '09:00', passWeight: 352, failWeight: 30.7 },
            { time: '10:00', passWeight: 540, failWeight: 48.7 },
            { time: '11:00', passWeight: 723, failWeight: 67.5 },
        ],
        predictedStalenessDays: 21,
    },
    {
        id: 'batch_b',
        name: 'Batch B - Espresso Roast',
        passFailTrend: [
            { name: 'Hour 1', passed: 1300, failed: 150 },
            { name: 'Hour 2', passed: 1450, failed: 165 },
            { name: 'Hour 3', passed: 1250, failed: 130 },
            { name: 'Hour 4', passed: 1200, failed: 160 },
        ],
        beanDistribution: [
            { name: 'Arabica', value: 4000 },
            { name: 'Robusta', value: 1200 },
        ],
        roastDistribution: [
            { name: 'Medium', value: 1300 },
            { name: 'Dark', value: 4000 },
        ],
        binWeights: [
            { time: '12:00', passWeight: 195, failWeight: 22.5 },
            { time: '13:00', passWeight: 412, failWeight: 47.2 },
            { time: '14:00', passWeight: 600, failWeight: 66.7 },
            { time: '15:00', passWeight: 780, failWeight: 90.7 },
        ],
        predictedStalenessDays: 14,
    }
];

const COLORS_BEAN = ['#6F4E37', '#A0522D', '#D2691E'];
const COLORS_ROAST = ['#F5DEB3', '#D2B48C', '#8B4513'];

const Analytics: React.FC = () => {
    const [selectedBatchId, setSelectedBatchId] = useState<string>(mockBatches[0].id);
    const [showMore, setShowMore] = useState(false);

    const selectedBatch = mockBatches.find(b => b.id === selectedBatchId) || mockBatches[0];

    const handleExportCSV = () => {
        if (!selectedBatch) return;

        const headers = ['Time/Period', 'Passed Beans', 'Failed Beans'];
        const rows = selectedBatch.passFailTrend.map(d => [d.name, d.passed, d.failed].join(','));
        
        let csvContent = "data:text/csv;charset=utf-8," 
            + `Batch Report: ${selectedBatch.name}\n`
            + headers.join(",") + "\n" 
            + rows.join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${selectedBatch.id}_report.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Analytics & Reports</h2>
            <p className="text-text-secondary">Monitor quality trends and system performance.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
             <select 
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                className="p-2 border rounded-md bg-surface text-sm text-text-primary"
             >
                {mockBatches.map(batch => (
                    <option key={batch.id} value={batch.id}>{batch.name}</option>
                ))}
             </select>
            <button onClick={handleExportCSV} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition-colors text-sm">Export Selected (CSV)</button>
             <button onClick={() => setShowMore(!showMore)} className="px-4 py-2 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition-colors text-sm">
                {showMore ? 'Hide Details' : 'View More Analytics'}
             </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Bean Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={selectedBatch.beanDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                {selectedBatch.beanDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_BEAN[index % COLORS_BEAN.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Roast Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={selectedBatch.roastDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" paddingAngle={5}>
                {selectedBatch.roastDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_ROAST[index % COLORS_ROAST.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Pass/Fail Trend</h3>
           <ResponsiveContainer width="100%" height={300}>
            <LineChart data={selectedBatch.passFailTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="passed" stroke="#4CAF50" strokeWidth={2} name="Passed" />
              <Line type="monotone" dataKey="failed" stroke="#D32F2F" strokeWidth={2} name="Failed" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      {showMore && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Batch Freshness Prediction</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-background">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Batch Name</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Predicted Days Until Stale</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockBatches.map((batch) => (
                                <tr key={batch.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-text-primary">{batch.name}</td>
                                    <td className="py-4 px-4 whitespace-nowrap text-sm text-text-secondary font-semibold">{batch.predictedStalenessDays} days</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Card>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Bin Weight Trends (g)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedBatch.binWeights}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="passWeight" stroke="#4CAF50" strokeWidth={2} name="Pass Bin (g)" />
                        <Line type="monotone" dataKey="failWeight" stroke="#D32F2F" strokeWidth={2} name="Fail Bin (g)" />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </div>
      )}

    </div>
  );
};

export default Analytics;
