import React from "react";

export default function SearchBy() {
    return (
        <div className="flex justify-center">
            <div
                className="relative 
        "
            >
                <input
                    type="text"
                    placeholder="Search students"
                    className="py-3  outline-none px-[5px] shadow-sm   text-[.8rem] rounded-md w-[300px]  border-[rgb(138,139,140)] pl-9 "
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
    );
}
