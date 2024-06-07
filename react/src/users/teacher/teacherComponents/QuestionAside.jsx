import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'


export default function QuestionAside({questions,selectedQuestionIndex,addQuestion,showQuestion,handleDeleteQuestion}) {

 
  return (
    <aside className=" mr-4">
      <div className=' flex justify-between relative  after:absolute after:w-full after:h-[1px] after:bg-gray-200 after:bottom-[-5px] after:left-0'>
        <p className='font-bold'>Question</p>
        <button className='w-6' onClick={addQuestion}>
        <svg  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0" fill="#fafafa"/></svg>
        </button>
      </div>
      <div className="mt-6 w-full">
            <div
                className="relative 
        "
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="py-1 w-full  outline-none px-[5px] shadow-sm   text-[.8rem] rounded-md  border-[rgb(138,139,140)] pl-9 "
                />
                <div
                    className="absolute top-[55%] -translate-y-1/2 left-0 pl-3  
              flex items-center  
              pointer-events-none"
                >
                    <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        className="w-3 text-[rgb(138,139,140)] fill-current"
                        imageRendering="optimizeQuality"
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                        viewBox="0 0 1707 1707"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Layer_x0020_1">
                            <path d="m623 1250c-166 0-323-65-440-183-118-118-183-274-183-440 0-167 65-323 183-441 117-118 274-182 440-182s323 64 441 182c117 118 182 274 182 441 0 166-65 322-182 440-118 118-275 183-441 183zm0-140c-129 0-251-50-342-141-91-92-142-213-142-342 0-130 51-251 142-343 91-91 213-141 342-141s251 50 342 141c189 189 189 496 0 685-91 91-213 141-342 141z" />
                            <path d="m1198 1309c-8 0-16-3-22-9l-134-134c23-18 44-36 64-57 23-22 43-46 62-71l135 135c12 12 12 31 0 43-6 5-13 8-21 8-7 0-13-2-18-6l-39 48c5 11 3 24-6 34-6 6-14 9-21 9z" />
                            <path d="m1577 1703c-34 0-67-13-91-38l-282-281c-24-24-37-57-37-91 0-35 13-68 37-92 25-24 57-38 92-38s67 14 92 38l281 281c50 51 50 133 0 183-25 25-57 38-92 38z" />
                            <path d="m421 829c-112-112-112-293 0-405 11-12 11-31 0-42-12-12-31-12-43 0-135 135-135 354 0 489 6 6 14 9 21 9 8 0 16-3 22-9 11-11 11-30 0-42z" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
      <div className='w-full'>
      {
         questions.length ? (
            questions.map((q, ind) => (
      
          <div key={ind}

        onClick={() => showQuestion(ind)}
        className={`flex cursor-pointer items-start gap-2 mt-3 py-1 pl-1  overflow-hidden ${
          selectedQuestionIndex === ind ? 'bg-[rgb(234,235,237)]' : ''
          
      }`}>
          <span className='text-sm'>{ind + 1}.</span>
          <svg fill="none" className='min-w-5 max-w-5 w-5 ' viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g fill="rgb(96,131,255)"><path d="m6.25 12c0-3.17564 2.57436-5.75 5.75-5.75 3.1756 0 5.75 2.57436 5.75 5.75 0 3.1756-2.5744 5.75-5.75 5.75-3.17564 0-5.75-2.5744-5.75-5.75z"/><path clipRule="evenodd" d="m12 1.25c-5.93706 0-10.75 4.81294-10.75 10.75 0 5.9371 4.81294 10.75 10.75 10.75 5.9371 0 10.75-4.8129 10.75-10.75 0-5.93706-4.8129-10.75-10.75-10.75zm-9.25 10.75c0-5.10863 4.14137-9.25 9.25-9.25 5.1086 0 9.25 4.14137 9.25 9.25 0 5.1086-4.1414 9.25-9.25 9.25-5.10863 0-9.25-4.1414-9.25-9.25z" fillRule="evenodd"/></g></svg>
          <p className='text-sm  line-clamp-2 overflow-hidden'>

            {q.question}
            </p>
            <TrashIcon 
            onClick={() => handleDeleteQuestion(ind)} 
            className='min-w-4 max-w-4 w-4 text-red-500  hover:[rotate:18deg] transition-all duration-500 ' />
      
        </div>
           ))
          ) : (
         
              <div className="text-xs text-gray-600 text-center py-3">
                You don't have any options defined
              </div>
       
          )
           }
      </div>
    </aside>
    
  )
}
