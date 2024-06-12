import React from "react";
import { VictoryPie, VictoryLegend } from "victory";

const StatisticGrades = ({ grades }) => {
    if (!grades || grades.length === 0) {
        return <div className="text-center mt-4">No data available</div>;
    }

    const passedCount = grades.filter((g) => g.total_exam_grade >= 10).length;
    const failedCount = grades.length - passedCount;

    const data = [
        { x: "Passed", y: passedCount },
        { x: "Failed", y: failedCount }
    ];

    const colorScale = ["green", "red"];

    return (
        <div className="p-10">
            <h2 className="text-xl font-bold mb-4 text-center">Exam Results</h2>
            <div className="flex gap-20">
                <div className=" ">
                <VictoryPie
                        data={data}
                        colorScale={colorScale}
                        innerRadius={60}
                        labels={({ datum }) => `${datum.x}: ${datum.y}`}
                        style={{
                            labels: { fontSize: 20, fill: "black" } // Adjust padding
                        }}
                        padding={{ left: 100, right: 100 }} // Adjust padding for chart
                    />
                </div>
                <div className="mt-4 ">
                    <VictoryLegend
                        colorScale={colorScale}
                        
                        data={[
                            { name: "Passed" },
                            { name: "Failed" }
                        ]}
                        style={{
                            labels: { fontSize: 25 }
                        }}
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <div className="flex items-center mr-8">
                    <div className="w-6 h-6 rounded-full bg-green mr-3"></div>
                    <span className="text-green-500">{passedCount} Students Passed</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-red mr-3"></div>
                    <span className="text-red-500 ">{failedCount} Students Failed</span>
                </div>
            </div>
        </div>
    );
};

export default StatisticGrades;
