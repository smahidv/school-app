import React, { useState } from 'react';
import { VictoryPie } from 'victory';

export default function ShowGrade() {
    const [showGrade, setShowGrade] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => { setShowGrade(!showGrade) }}
                className='rounded-md py-2 px-4 mt-6 mb-4 w-fit bg-blue-500 text-white'>
               Show Grade
            </button>
            {showGrade &&
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
                    <div className='bg-white shadow-md rounded-lg p-6'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg font-semibold'>Grade Details</h2>
                            <button
                                onClick={() => { setShowGrade(false) }}
                                className='text-red-500 hover:text-red-600 focus:outline-none'>
                                <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                    <path fillRule='evenodd' d='M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z' clipRule='evenodd' />
                                </svg>
                            </button>
                        </div>
                        <p className='text-gray-700 text-xl mb-2 text-center'><span className="text-green-600 font-bold">Excellent!</span></p>
                        <p className='text-gray-700 text-xl mb-4  text-center'><span className="text-gray-600">You got </span><span className="text-green-600 font-bold">18/20</span></p>

                        <div style={{ maxWidth: '300px' }}>
                            <VictoryPie
                                data={[
                                    { x: 'Correct', y: 18 },
                                    { x: 'Incorrect', y: 20 - 18 }
                                ]}
                                colorScale={['#4CAF50', '#F44336']}
                                height={200}
                                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                style={{
                                    labels: { fontSize: 15, fill: 'black', fontWeight: 'bold' },
                                    data: {
                                        fillOpacity: 0.9, stroke: '#fff', strokeWidth: 2
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
