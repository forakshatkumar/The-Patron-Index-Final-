import { useMemo, useState } from 'react'

import { Link, useSearchParams } from 'react-router-dom'

import SegmentBadge from '../components/SegmentBadge'

import { customers, segmentData } from '../data/mockData'

function Customers () {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialSearch = searchParams.get('q') || ''

  const initialSegment = searchParams.get('segment') || 'All'

  const [search, setSearch] = useState(initialSearch)

  const [segment, setSegment] = useState(initialSegment)

  const [status, setStatus] = useState('All')

  const [sort, setSort] = useState('score-high')

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  const filteredCustomers = useMemo(() => {
    let result = [...customers]

    if (search.trim()) {
      const query = search.toLowerCase()

      result = result.filter(
        customer =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.id.toLowerCase().includes(query)
      )
    }

    if (segment !== 'All') {
      result = result.filter(customer => customer.segment === segment)
    }

    if (status !== 'All') {
      result = result.filter(customer => customer.status === status)
    }

    if (sort === 'score-high') {
      result.sort((a, b) => b.patronIndex - a.patronIndex)
    }

    if (sort === 'spending-high') {
      result.sort((a, b) => b.totalSpending - a.totalSpending)
    }

    if (sort === 'purchases-high') {
      result.sort((a, b) => b.totalPurchases - a.totalPurchases)
    }

    if (sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [search, segment, status, sort])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / itemsPerPage)
  )

  const start = (currentPage - 1) * itemsPerPage

  const visibleCustomers = filteredCustomers.slice(start, start + itemsPerPage)

  const handleSearch = value => {
    setSearch(value)
    setCurrentPage(1)

    const nextParams = new URLSearchParams(searchParams)

    if (value) {
      nextParams.set('q', value)
    } else {
      nextParams.delete('q')
    }

    setSearchParams(nextParams)
  }

  const handleSegment = value => {
    setSegment(value)
    setCurrentPage(1)

    const nextParams = new URLSearchParams(searchParams)

    if (value !== 'All') {
      nextParams.set('segment', value)
    } else {
      nextParams.delete('segment')
    }

    setSearchParams(nextParams)
  }

  return (
    <div className='page'>
      <div className='page-heading'>
        <div>
          <h2>Customers</h2>
          <p>View and manage your customer base.</p>
        </div>

        <Link to='/import' className='primary-button'>
          + Import Customers
        </Link>
      </div>

      <section className='card'>
        <div className='customer-controls'>
          <input
            className='search-input'
            type='text'
            placeholder='Search by name, email or ID...'
            value={search}
            onChange={event => handleSearch(event.target.value)}
          />

          <select
            value={segment}
            onChange={event => handleSegment(event.target.value)}
          >
            <option value='All'>All Segments</option>

            {segmentData.map(item => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={event => {
              setStatus(event.target.value)
              setCurrentPage(1)
            }}
          >
            <option value='All'>All Statuses</option>

            <option value='Active'>Active</option>

            <option value='At Risk'>At Risk</option>

            <option value='Inactive'>Inactive</option>
          </select>

          <select value={sort} onChange={event => setSort(event.target.value)}>
            <option value='score-high'>Highest Patron Index</option>

            <option value='spending-high'>Highest Spending</option>

            <option value='purchases-high'>Most Purchases</option>

            <option value='name'>Name A-Z</option>
          </select>
        </div>

        <div className='table-wrapper'>
          <table className='data-table'>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Segment</th>
                <th>Total Spending</th>
                <th>Purchase Frequency</th>
                <th>Last Purchase</th>
                <th>Patron Index</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {visibleCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <Link
                      className='customer-link'
                      to={`/customers/${customer.id}`}
                    >
                      <strong>{customer.name}</strong>

                      <span>{customer.id}</span>
                    </Link>
                  </td>

                  <td>
                    <SegmentBadge segment={customer.segment} />
                  </td>

                  <td>₹{customer.totalSpending.toLocaleString()}</td>

                  <td>{customer.purchaseFrequency}</td>

                  <td>{customer.lastPurchaseText}</td>

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

          {!visibleCustomers.length && (
            <div className='empty-state'>
              <h3>No customers found</h3>
              <p>Try changing your filters or search.</p>
            </div>
          )}
        </div>

        <div className='pagination'>
          <span>
            Showing {visibleCustomers.length} of {filteredCustomers.length}{' '}
            customers
          </span>

          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Customers
