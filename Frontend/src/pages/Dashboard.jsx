import { Link } from 'react-router-dom'

import StatCard from '../components/StatCard'
import RevenueChart from '../components/RevenueChart'
import SegmentBadge from '../components/SegmentBadge'

import {
  dashboardStats,
  revenueData,
  segmentData,
  customers,
  dashboardInsights,
  purchaseActivity
} from '../data/mockData'

function Dashboard () {
  const recentCustomers = customers.slice(0, 5)

  return (
    <div className='page'>
      <div className='page-heading'>
        <div>
          <h2>Business Overview</h2>
          <p>Track customer activity, revenue and customer value.</p>
        </div>

        <div className='page-actions'>
          <Link to='/import' className='secondary-button'>
            Import Data
          </Link>

          <Link to='/customers' className='primary-button'>
            View Customers
          </Link>
        </div>
      </div>

      <div className='stats-grid'>
        <StatCard
          title='Total Customers'
          value={dashboardStats.totalCustomers.toLocaleString()}
          change='8.2%'
          description='vs last month'
          icon='◉'
        />

        <StatCard
          title='Active Customers'
          value={dashboardStats.activeCustomers.toLocaleString()}
          change='5.4%'
          description='vs last month'
          icon='✓'
        />

        <StatCard
          title='High-Value Customers'
          value={dashboardStats.highValueCustomers.toLocaleString()}
          change='12.1%'
          description='vs last month'
          icon='★'
        />

        <StatCard
          title='Total Revenue'
          value={`₹${(dashboardStats.totalRevenue / 100000).toFixed(1)}L`}
          change='10.3%'
          description='vs last month'
          icon='₹'
        />
      </div>

      <div className='dashboard-grid'>
        <section className='card dashboard-large-card'>
          <div className='card-header'>
            <div>
              <h3>Revenue Trend</h3>
              <p>Revenue performance over the last 6 months</p>
            </div>
          </div>

          <RevenueChart data={revenueData} />
        </section>

        <section className='card'>
          <div className='card-header'>
            <div>
              <h3>Customer Segments</h3>
              <p>Distribution of your customer base</p>
            </div>

            <Link to='/segments' className='text-button'>
              View all
            </Link>
          </div>

          <div className='segment-list'>
            {segmentData.map(segment => (
              <div className='segment-summary-row' key={segment.id}>
                <div>
                  <SegmentBadge segment={segment.name} />
                </div>

                <div className='segment-summary-right'>
                  <strong>{segment.customers.toLocaleString()}</strong>

                  <span>{segment.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className='dashboard-grid'>
        <section className='card dashboard-large-card'>
          <div className='card-header'>
            <div>
              <h3>Purchase Activity</h3>
              <p>New and repeat customer purchases</p>
            </div>
          </div>

          <div className='activity-chart'>
            {purchaseActivity.map(item => (
              <div className='activity-column' key={item.month}>
                <div className='activity-bars'>
                  <div
                    className='activity-bar new-bar'
                    style={{
                      height: `${item.newCustomers / 2}px`
                    }}
                    title={`${item.newCustomers} new customers`}
                  ></div>

                  <div
                    className='activity-bar repeat-bar'
                    style={{
                      height: `${item.repeatCustomers / 2}px`
                    }}
                    title={`${item.repeatCustomers} repeat customers`}
                  ></div>
                </div>

                <span>{item.month}</span>
              </div>
            ))}
          </div>

          <div className='chart-legend'>
            <span>
              <i className='legend-dot new-dot'></i>
              New Customers
            </span>

            <span>
              <i className='legend-dot repeat-dot'></i>
              Repeat Customers
            </span>
          </div>
        </section>

        <section className='card'>
          <div className='card-header'>
            <div>
              <h3>Key Insights</h3>
              <p>Important changes in your business</p>
            </div>
          </div>

          <div className='insight-list'>
            {dashboardInsights.map(insight => (
              <div className={`insight-item ${insight.type}`} key={insight.id}>
                <span className='insight-icon'>
                  {insight.type === 'warning' ? '!' : '✓'}
                </span>

                <p>{insight.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className='card'>
        <div className='card-header'>
          <div>
            <h3>Recent Customers</h3>
            <p>Recently active customers</p>
          </div>

          <Link to='/customers' className='text-button'>
            View all customers
          </Link>
        </div>

        <div className='table-wrapper'>
          <table className='data-table'>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Segment</th>
                <th>Total Spending</th>
                <th>Purchases</th>
                <th>Patron Index</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <Link
                      to={`/customers/${customer.id}`}
                      className='customer-link'
                    >
                      <strong>{customer.name}</strong>
                      <span>{customer.id}</span>
                    </Link>
                  </td>

                  <td>
                    <SegmentBadge segment={customer.segment} />
                  </td>

                  <td>₹{customer.totalSpending.toLocaleString()}</td>

                  <td>{customer.totalPurchases}</td>

                  <td>
                    <strong>{customer.patronIndex}</strong>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        customer.status === 'Active'
                          ? 'status-active'
                          : customer.status === 'At Risk'
                          ? 'status-risk'
                          : 'status-inactive'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
