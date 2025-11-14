import React from 'react';
import Card from './common/Card';
import { LogEntry, UserRole } from '../types';

const mockLogs: LogEntry[] = [
  { id: 1, timestamp: '2023-10-27 10:00:01', type: 'EVENT', message: 'System Started by admin@qualibean.com' },
  { id: 2, timestamp: '2023-10-27 10:00:05', type: 'INFO', message: 'Bean #1 classified as PASS.' },
  { id: 3, timestamp: '2023-10-27 10:00:06', type: 'INFO', message: 'Bean #2 classified as PASS.' },
  { id: 4, timestamp: '2023-10-27 10:00:08', type: 'INFO', message: 'Bean #3 classified as FAIL.' },
  { id: 5, timestamp: '2023-10-27 10:01:15', type: 'ERROR', message: 'Spectrometer timeout on Bean #152. Retrying.' },
  { id: 6, timestamp: '2023-10-27 10:02:00', type: 'INFO', message: 'Pass bin weight updated: 25.50g' },
  { id: 7, timestamp: '2023-10-27 10:05:30', type: 'EVENT', message: 'System Stopped by admin@qualibean.com' },
];

const LogTypeBadge: React.FC<{ type: LogEntry['type'] }> = ({ type }) => {
    const colorMap = {
        INFO: 'bg-blue-100 text-blue-800',
        EVENT: 'bg-secondary bg-opacity-20 text-amber-800',
        ERROR: 'bg-error bg-opacity-20 text-red-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorMap[type]}`}>{type}</span>;
}

const Logs: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
    const filteredLogs = userRole === 'admin' ? mockLogs : mockLogs.filter(log => log.type !== 'ERROR');
    
  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">System Logs</h2>
          <p className="text-text-secondary">
            {userRole === 'admin' ? 'Full logs including error events.' : 'Read-only, limited logs.'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input type="text" placeholder="Filter logs..." className="p-2 border rounded-md bg-surface text-sm" />
          <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition-colors text-sm">Export CSV</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-surface">
          <thead className="bg-background">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Timestamp</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Type</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap text-sm text-text-secondary">{log.timestamp}</td>
                <td className="py-3 px-4 whitespace-nowrap"><LogTypeBadge type={log.type} /></td>
                <td className="py-3 px-4 text-sm text-text-primary">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Logs;
