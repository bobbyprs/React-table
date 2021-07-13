
import React, { useMemo } from 'react'
import { useTable,useSortBy, useGlobalFilter,useFilters , usePagination} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { ColumnFilter } from './ColumnFilter'
import {Table,Button,Form} from 'react-bootstrap'


function Tables() {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    const defaultColumn = React.useMemo(
        () => ({
          Filter: ColumnFilter
        }),
        []
      )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
       
        prepareRow,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
    } = useTable({
        columns,
        data,
        defaultColumn,
        initialState: { pageIndex: 0 }
    },useFilters,useGlobalFilter,useSortBy,usePagination)
    const {globalFilter,pageIndex, pageSize} = state
    return (
        <div className='cointainer ' style={{marginBottom:'30px',marginRight:'30px',marginLeft:'30px'}}>
          <div className='cointainer' style={{marginBottom:'20px'}}>
          <ColumnFilter filter={globalFilter} setFilter={setGlobalFilter}/>
          </div>
            
            <Table id='m' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          
        </tfoot>
      </Table>
      <div>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select aria-label="Default select examp"
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[10,15, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
        </div>
    )
}

export default Tables
