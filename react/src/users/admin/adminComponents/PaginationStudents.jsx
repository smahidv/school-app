import React from 'react'

export default function PaginationStudents({ meta, onPageClick }) {
    function onClick(ev, link) {
        ev.preventDefault();
        if (!link.url) {
          return;
        }
        onPageClick(link)
      }
  return (
    <div className="flex items-center justify-between mt-6">
    <a
        href="#"
        className="flex items-center px-5 py-2 text-xs text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
        </svg>

        <span  onClick={ev => onClick(ev, meta.links[0])}>previous</span>
    </a>

    <div className="items-center hidden md:flex gap-x-3">
        <a
            href="#"
            className="px-2 py-1 text-xs text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
        >
            <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{" "}
            <span className="font-medium">{meta.to}</span> of &nbsp;
            <span className="font-medium">{meta.total}</span> students
          </p>
        </div>
        </a>
        
    </div>

    <a
        href="#"
        className="flex items-center px-5 py-2 text-xs text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
    >
        <span   onClick={ev => onClick(ev, meta.links[meta.links.length - 1])}>Next</span>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
        </svg>
    </a>
</div>
  )
}
