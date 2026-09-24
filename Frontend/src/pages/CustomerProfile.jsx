import { Link, useParams } from 'react-router-dom'

import SegmentBadge from '../components/SegmentBadge'
import RevenueChart from '../components/RevenueChart'

import {
  customers,
  transactions,
  customerInsights,
  customerSpendingHistory
} from '../data/mockData'

function CustomerProfile () {
  const { id } = useParams()

  const customer = customers.find(item => item.id === id)

  if (!customer) {
    return (
      <div className='page'>
        <div className='empty-state'>
          <h2>Customer not found</h2>

          <Link to='/customers' className='primary-button'>
            Back to Customers
          </Link>
        </div>
      </div>
    )
  }

  const customerTransactions = transactions.filter(
    transaction => transaction.customerId === customer.id
  )

  const insights = customerInsights[customer.id] || [
    'No insights available yet.'
  ]

  const spendingData = customerSpendingHistory[customer.id] || [
    {
      month: 'Sep',
      value: customer.totalSpending
    }
  ]

  return (
    <div className='page'>
      <Link to='/customers' className='back-link'>
        ← Back to Customers
      </Link>

      <section className='customer-profile-header'>
        <div className='customer-profile-main'>
          <div className='large-avatar'>
            {customer.name
              .split(' ')
              .map(word => word[0])
              .join('')
              .slice(0, 2)}
          </div>

          <div>
            <div className='profile-name-row'>
              <h2>{customer.name}</h2>

              <SegmentBadge segment={customer.segment} />
            </div>

            <p>
              {customer.id} · {customer.email}
            </p>

            <span>{customer.location}</span>
          </div>
        </div>

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
      </section>

      <div className='profile-stats-grid'>
        <div className='card profile-stat'>
          <span>Patron Index</span>
          <strong>{customer.patronIndex} / 100</strong>

          <div className='score-progress'>
            <div
              style={{
                width: `${customer.patronIndex}%`
              }}
            ></div>
          </div>
        </div>

        <div className='card profile-stat'>
          <span>Total Spending</span>
          <strong>₹{customer.totalSpending.toLocaleString()}</strong>
        </div>

        <div className='card profile-stat'>
          <span>Total Purchases</span>
          <strong>{customer.totalPurchases}</strong>
        </div>

        <div className='card profile-stat'>
          <span>Average Order Value</span>
          <strong>₹{customer.averageOrderValue.toLocaleString()}</strong>
        </div>

        <div className='card profile-stat'>
          <span>Last Purchase</span>
          <strong>{customer.lastPurchaseText}</strong>
        </div>
      </div>

      <div className='profile-grid'>
        <section className='card'>
          <div className='card-header'>
            <div>
              <h3>Spending Trend</h3>
              <p>Customer spending over time</p>
            </div>
          </div>

          <RevenueChart
            data={spendingData.map(item => ({
              label: item.month,
              value: item.value
            }))}
          />
        </section>

        <section className='card'>
          <div className='card-header'>
            <div>
              <h3>Business Insights</h3>
              <p>Suggested actions for this customer</p>
            </div>
          </div>

          <div className='insight-list'>
            {insights.map((insight, index) => (
              <div className='insight-item positive' key={index}>
                <span className='insight-icon'>✓</span>

                <p>{insight}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className='profile-grid'>
        <section className='card'>
          <div className='card-header'>
            <div>
              <h3>Purchase History</h3>
              <p>Recent customer transactions</p>
            </div>
          </div>

          {customerTransactions.length ? (
            <div className='table-wrapper'>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {customerTransactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>

                      <td>{transaction.product}</td>

                      <td>{transaction.category}</td>

                      <td>₹{transaction.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='muted-text'>
              No transaction history available in the demo data.
            </p>
          )}
        </section>

        <section className='card'>
          <div className='card-header'>
            <div>
              <h3>Customer Details</h3>
            </div>
          </div>

          <div className='details-list'>
            <div>
              <span>Email</span>
              <strong>{customer.email}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{customer.phone}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{customer.location}</strong>
            </div>

            <div>
              <span>Customer Since</span>
              <strong>{customer.customerSince}</strong>
            </div>

            <div>
              <span>Purchase Frequency</span>
              <strong>{customer.purchaseFrequency}</strong>
            </div>

            <div>
              <span>Segment</span>
              <strong>{customer.segment}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CustomerProfile
