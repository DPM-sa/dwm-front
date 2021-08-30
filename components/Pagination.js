import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }
    const handleClick = (n) => {
        paginate(n)
        setPage(n)
    }
    
    const handlePaginationReturn = () => {
        if (page === 1) return
        setPage(page - 1)
        paginate(page - 1)
    }

    const handlePaginationAdvance = () => {
        if (page >= totalPages) return
        setPage(page + 1)
        paginate(page + 1)
    }

    return (
        <div className="pagination-component">
            <button onClick={handlePaginationReturn}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {pageNumbers.map(number => (
                <button key={number} className={page === number && 'selected'} onClick={() => handleClick(number)}>
                    {number}
                </button>
            ))}
            <button onClick={handlePaginationAdvance} disabled={page === totalPages}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}

export default Pagination
