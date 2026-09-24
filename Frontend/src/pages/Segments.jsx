import { Link } from 'react-router-dom'

import SegmentBadge from '../components/SegmentBadge'

import { segmentData } from '../data/mockData'

function Segments () {
  return (
    <div className='page'>
      <div className='page-heading'>
        <div>
          <h2>Customer Segments</h2>
          <p>
            Understand customer behaviour and contribution to your business.
          </p>
        </div>
      </div>

      <div className='segment-card-grid'>
        {segmentData.map(segment => (
          <section className='card segment-card' key={segment.id}>
            <div className='segment-card-header'>
              <SegmentBadge segment={segment.name} />

              <strong>{segment.percentage}%</strong>
            </div>

            <h2>{segment.customers.toLocaleString()}</h2>

            <span className='muted-text'>Customers</span>

            <div className='segment-metrics'>
              <div>
                <span>Revenue Contribution</span>
                <strong>{segment.revenueContribution}%</strong>
              </div>

              <div>
                <span>Average Spending</span>
                <strong>₹{segment.averageSpending.toLocaleString()}</strong>
              </div>

              <div>
                <span>Purchase Frequency</span>
                <strong>{segment.purchaseFrequency}</strong>
              </div>

              <div>
                <span>Last Activity</span>
                <strong>{segment.lastActivity}</strong>
              </div>
            </div>

            <Link
              to={`/customers?segment=${encodeURIComponent(segment.name)}`}
              className='segment-view-button'
            >
              View Customers →
            </Link>
          </section>
        ))}
      </div>

      <section className='card'>
        <div className='card-header'>
          <div>
            <h3>Segment Performance</h3>
            <p>Compare customer groups at a glance</p>
          </div>
        </div>

        <div className='table-wrapper'>
          <table className='data-table'>
            <thead>
              <tr>
                <th>Segment</th>
                <th>Customers</th>
                <th>Revenue</th>
                <th>Avg. Spending</th>
                <th>Frequency</th>
                <th>Last Activity</th>
              </tr>
            </thead>

            <tbody>
              {segmentData.map(segment => (
                <tr key={segment.id}>
                  <td>
                    <SegmentBadge segment={segment.name} />
                  </td>

                  <td>{segment.customers.toLocaleString()}</td>

                  <td>{segment.revenueContribution}%</td>

                  <td>₹{segment.averageSpending.toLocaleString()}</td>

                  <td>{segment.purchaseFrequency}</td>

                  <td>{segment.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Segments
