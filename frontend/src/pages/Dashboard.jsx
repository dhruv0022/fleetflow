import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, AlertCircle, Wrench, PlusCircle } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import AssetChart from '../components/dashboard/AssetChart';
import RecentAssets from '../components/dashboard/RecentAssets';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

/**
 * Dashboard Page
 * Main overview page with statistics, charts, and recent activity
 */
const Dashboard = () => {
  const { stats, fetchStats, loading } = useAssets();

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's your asset overview.
            </p>
          </div>
          <Link to="/assets/new">
            <Button 
              variant="primary" 
              size="lg"
              icon={<PlusCircle size={20} />}
            >
              Add Asset
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Assets"
            value={stats?.totalAssets || 0}
            icon={<Package size={28} />}
            color="blue"
            loading={loading && !stats}
          />
          
          <StatCard
            title="Active Assets"
            value={stats?.statusStats?.Active || 0}
            icon={<TrendingUp size={28} />}
            color="green"
            subtitle="Currently in use"
            loading={loading && !stats}
          />
          
          <StatCard
            title="In Maintenance"
            value={stats?.statusStats?.Maintenance || 0}
            icon={<Wrench size={28} />}
            color="yellow"
            subtitle="Under repair"
            loading={loading && !stats}
          />
          
          <StatCard
            title="Retired"
            value={stats?.statusStats?.Retired || 0}
            icon={<AlertCircle size={28} />}
            color="red"
            subtitle="Out of service"
            loading={loading && !stats}
          />
        </div>

        {/* Financial Stats */}
        {stats?.totalValue && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <div className="text-center py-4">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Total Asset Value
                </p>
                <p className="text-4xl font-bold text-blue-600">
                  ${stats.totalValue?.toLocaleString() || 0}
                </p>
              </div>
            </Card>
            
            <Card>
              <div className="text-center py-4">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Average Asset Value
                </p>
                <p className="text-4xl font-bold text-green-600">
                  ${stats.avgValue?.toLocaleString() || 0}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assets by Category Chart */}
          <Card 
            title="Assets by Category" 
            subtitle="Distribution across categories"
          >
            <AssetChart 
              data={stats?.categoryStats || []} 
              loading={loading && !stats}
            />
          </Card>

          {/* Recent Assets */}
          <Card 
            title="Recent Assets" 
            subtitle="Latest additions to inventory"
            headerAction={
              <Link 
                to="/assets"
                className="
                  text-sm font-semibold text-blue-600 
                  hover:text-blue-700 hover:underline
                  transition-colors duration-200
                "
              >
                View All
              </Link>
            }
          >
            <RecentAssets 
              assets={stats?.recentAssets || []} 
              loading={loading && !stats}
            />
          </Card>
        </div>

        {/* Maintenance Due Soon */}
        {stats?.maintenanceDue && stats.maintenanceDue.length > 0 && (
          <Card 
            title="⚠️ Maintenance Due Soon" 
            subtitle="Assets requiring attention within 7 days"
          >
            <div className="space-y-3">
              {stats.maintenanceDue.map((asset) => (
                <div
                  key={asset._id}
                  className="
                    flex items-center justify-between 
                    p-4 
                    bg-yellow-50 hover:bg-yellow-100
                    rounded-xl 
                    border-2 border-yellow-200
                    transition-colors duration-200
                  "
                >
                  <div className="flex items-center gap-4">
                    <div className="
                      flex items-center justify-center
                      w-12 h-12
                      bg-yellow-200 rounded-xl
                    ">
                      <AlertCircle size={24} className="text-yellow-700" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {asset.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Next maintenance: {new Date(asset.maintenanceSchedule?.nextMaintenance).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link to={`/assets/${asset._id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/assets/new" className="group">
              <div className="
                p-6 
                bg-blue-50 hover:bg-blue-100
                rounded-xl 
                border-2 border-blue-200 hover:border-blue-300
                transition-all duration-200
                text-center
              ">
                <div className="
                  inline-flex items-center justify-center
                  w-12 h-12
                  bg-blue-600 group-hover:bg-blue-700
                  rounded-xl
                  mb-3
                  transition-colors duration-200
                ">
                  <PlusCircle size={24} className="text-white" />
                </div>
                <p className="font-bold text-gray-900">Add New Asset</p>
                <p className="text-sm text-gray-600 mt-1">Create asset record</p>
              </div>
            </Link>

            <Link to="/assets?status=Active" className="group">
              <div className="
                p-6 
                bg-green-50 hover:bg-green-100
                rounded-xl 
                border-2 border-green-200 hover:border-green-300
                transition-all duration-200
                text-center
              ">
                <div className="
                  inline-flex items-center justify-center
                  w-12 h-12
                  bg-green-600 group-hover:bg-green-700
                  rounded-xl
                  mb-3
                  transition-colors duration-200
                ">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <p className="font-bold text-gray-900">View Active</p>
                <p className="text-sm text-gray-600 mt-1">Active assets only</p>
              </div>
            </Link>

            <Link to="/assets?status=Maintenance" className="group">
              <div className="
                p-6 
                bg-yellow-50 hover:bg-yellow-100
                rounded-xl 
                border-2 border-yellow-200 hover:border-yellow-300
                transition-all duration-200
                text-center
              ">
                <div className="
                  inline-flex items-center justify-center
                  w-12 h-12
                  bg-yellow-600 group-hover:bg-yellow-700
                  rounded-xl
                  mb-3
                  transition-colors duration-200
                ">
                  <Wrench size={24} className="text-white" />
                </div>
                <p className="font-bold text-gray-900">Maintenance</p>
                <p className="text-sm text-gray-600 mt-1">Under repair</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;