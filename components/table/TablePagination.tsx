'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
  canPreviousPage: boolean
  canNextPage: boolean
}

const TablePagination = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  canPreviousPage,
  canNextPage,
}: TablePaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <button
            className="px-4 py-2 border rounded"
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <button
              className={`px-4 py-2 border rounded ${
                index + 1 === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => console.log(`Go to page ${index + 1}`)}
            >
              {index + 1}
            </button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <button
            className="px-4 py-2 border rounded"
            onClick={onNextPage}
            disabled={!canNextPage}
          >
            Next
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TablePagination
