import React, { useState, useEffect, useRef } from 'react';
import Card from './common/Card';
import { UserRole, SystemStatus, RecentBean } from '../types';

const AVERAGE_BEAN_WEIGHT_G = 0.15;

const StatusIndicator: React.FC<{ status: SystemStatus }> = ({ status }) => {
  const colorMap: Record<SystemStatus, string> = {
    Running: 'bg-success',
    Idle: 'bg-gray-400',
    Error: 'bg-error',
  };

  return (
    <div className="flex items-center">
      <span className={`relative flex h-3 w-3`}>
        {status === 'Running' && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorMap[status]} opacity-75`}></span>}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${colorMap[status]}`}></span>
      </span>
      <span className="ml-3 font-medium text-lg text-text-primary">{status}</span>
    </div>
  );
};

interface BeanFlowVisProps {
  recentBeans: RecentBean[];
}

const BeanFlowVis: React.FC<BeanFlowVisProps> = ({ recentBeans }) => {
    const [animatedBean, setAnimatedBean] = useState<{ id: number; status: 'Pass' | 'Fail' } | null>(null);
    const prevBeanIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (recentBeans.length > 0 && recentBeans[0].id !== prevBeanIdRef.current) {
            prevBeanIdRef.current = recentBeans[0].id;
            setAnimatedBean({ id: recentBeans[0].id, status: recentBeans[0].status });

            const timer = setTimeout(() => {
                setAnimatedBean(null);
            }, 2500); // Must be same as animation duration

            return () => clearTimeout(timer);
        }
    }, [recentBeans]);

    const animationClass = animatedBean
        ? animatedBean.status === 'Pass'
            ? 'animate-flow-pass'
            : 'animate-flow-fail'
        : '';
    
    return (
        <Card className="h-full">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Live Bean Flow</h3>
            <div className="relative h-full min-h-[300px] bg-background rounded-lg p-4 overflow-hidden">
                {/* Animated Bean */}
                {animatedBean && (
                    <div
                        key={animatedBean.id}
                        className={`absolute w-3 h-4 bg-primary rounded-full z-10 opacity-0 ${animationClass}`}
                        style={{ top: '15%', left: '50%' }}
                    ></div>
                )}
                
                {/* Static Diagram */}
                <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-center">
                    <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center font-bold text-text-secondary">Hopper</div>
                </div>
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 text-center">
                    <div className="w-28 h-12 bg-blue-100 rounded-md flex items-center justify-center font-bold text-blue-800">Spectrometer</div>
                </div>
                
                 <div className="absolute top-[55%] left-0 w-full h-[30%] z-0">
                  <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <path d="M 100 0 L 50 100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4" fill="none" />
                    <path d="M 100 0 L 150 100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4" fill="none" />
                  </svg>
                </div>

                <div className="absolute bottom-[0%] left-[25%] -translate-x-1/2 text-center">
                    <div className="w-28 h-12 bg-green-100 rounded-md flex items-center justify-center font-bold text-green-800">Pass Bin</div>
                </div>
                <div className="absolute bottom-[0%] left-[75%] -translate-x-1/2 text-center">
                    <div className="w-28 h-12 bg-red-100 rounded-md flex items-center justify-center font-bold text-red-800">Fail Bin</div>
                </div>
            </div>
        </Card>
    );
};

const RecentlyProcessed: React.FC<{ beans: RecentBean[] }> = ({ beans }) => (
  <Card className="sm:col-span-2">
    <h3 className="text-lg font-semibold text-text-primary mb-4">Recently Processed Beans</h3>
    <div className="overflow-y-auto max-h-80">
      <table className="min-w-full">
        <thead className="bg-background sticky top-0">
          <tr>
            <th className="py-2 px-3 text-left text-xs font-semibold text-text-secondary uppercase">Time</th>
            <th className="py-2 px-3 text-left text-xs font-semibold text-text-secondary uppercase">Type</th>
            <th className="py-2 px-3 text-left text-xs font-semibold text-text-secondary uppercase">Roast</th>
            <th className="py-2 px-3 text-left text-xs font-semibold text-text-secondary uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {beans.map((bean) => (
            <tr key={bean.id} className="hover:bg-gray-50">
              <td className="py-2 px-3 whitespace-nowrap text-sm text-text-secondary">{bean.timestamp}</td>
              <td className="py-2 px-3 whitespace-nowrap text-sm font-medium text-text-primary">{bean.type}</td>
              <td className="py-2 px-3 whitespace-nowrap text-sm text-text-secondary">{bean.roast}</td>
              <td className={`py-2 px-3 whitespace-nowrap text-sm font-semibold ${bean.status === 'Pass' ? 'text-success' : 'text-error'}`}>{bean.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

// FIX: Added DashboardProps interface to define props for the Dashboard component.
interface DashboardProps {
  userRole: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [status, setStatus] = useState<SystemStatus>('Running');
  const [totalBeans, setTotalBeans] = useState(0);
  const [passedBeans, setPassedBeans] = useState(0);
  const [failedBeans, setFailedBeans] = useState(0);
  const [recentBeans, setRecentBeans] = useState<RecentBean[]>([]);

  useEffect(() => {
    if (status !== 'Running') return;

    const interval = setInterval(() => {
      const newBeanId = Date.now();
      const passOrFail = Math.random() > 0.1 ? 'Pass' : 'Fail';
      const beanTypes: RecentBean['type'][] = ['Arabica', 'Robusta'];
      const roastLevels: RecentBean['roast'][] = ['Light', 'Medium', 'Dark'];
      
      const newBean: RecentBean = {
          id: newBeanId,
          timestamp: new Date().toLocaleTimeString(),
          type: beanTypes[Math.floor(Math.random() * beanTypes.length)],
          roast: roastLevels[Math.floor(Math.random() * roastLevels.length)],
          status: passOrFail,
      };

      setTotalBeans((prev) => prev + 1);
      if (passOrFail === 'Pass') {
        setPassedBeans((prev) => prev + 1);
      } else {
        setFailedBeans((prev) => prev + 1);
      }

      setRecentBeans(prev => [newBean, ...prev.slice(0, 9)]);

      if (Math.random() < 0.005) {
          setStatus('Error');
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [status]);

  const passedWeight = (passedBeans * AVERAGE_BEAN_WEIGHT_G).toFixed(2);
  const failedWeight = (failedBeans * AVERAGE_BEAN_WEIGHT_G).toFixed(2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card>
            <h3 className="text-lg font-semibold text-text-secondary">System Status</h3>
            <div className="mt-4"><StatusIndicator status={status} /></div>
        </Card>
        <Card>
            <h3 className="text-lg font-semibold text-text-secondary">Total Beans Processed</h3>
            <p className="text-4xl font-bold mt-2 text-text-primary">{totalBeans.toLocaleString()}</p>
        </Card>
        
        <RecentlyProcessed beans={recentBeans} />
        
      </div>

      <div className="lg:row-span-2">
         <BeanFlowVis recentBeans={recentBeans} />
      </div>
      
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-green-50 border-l-4 border-success">
            <h3 className="text-lg font-semibold text-green-800">Passed Beans</h3>
            <p className="text-3xl font-bold text-green-900 mt-2">{passedBeans.toLocaleString()}</p>
            <p className="text-md text-green-700 mt-1">{passedWeight} g</p>
        </Card>
        <Card className="bg-red-50 border-l-4 border-error">
            <h3 className="text-lg font-semibold text-red-800">Failed Beans</h3>
            <p className="text-3xl font-bold text-red-900 mt-2">{failedBeans.toLocaleString()}</p>
            <p className="text-md text-red-700 mt-1">{failedWeight} g</p>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;