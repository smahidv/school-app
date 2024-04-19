import React from "react";

export default function QuestionEditor() {
    return (
        <div>
          <div className="mb-4">
          <textarea
                        rows={5} cols={40}
                        placeholder="Instrctions(optional)"
                        className="bg-white rounded-md text-gray-500 placeholder:text-sm  shadow-md outline-none  w-full px-4 py-1 "
                    />
          </div>
            <div className="border-[1px] border-dashed border-[#cfcece] py-2 ">
                <div className="flex gap-3  bg-white shadow-md w-fit m-auto px-3 py-1 justify-center">
                    <svg
                        id="Слой_1"
                        className="w-4"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g fill="rgb(156,163,175)">
                            <path d="m412.103 0h-312.19c-55.083 0-99.897 44.83-99.897 99.913v312.173c0 55.084 44.814 99.914 99.897 99.914h312.189c55.068 0 99.881-44.83 99.881-99.913v-312.174c.001-55.083-44.813-99.913-99.88-99.913zm-312.19 32.813h312.189c36.979 0 67.068 30.089 67.068 67.1v289.823c-19.811-13.094-34.273-48.174-48.258-82.69-21.678-53.514-44.093-108.854-95.091-108.854-48.851 0-71.058 34.287-90.653 64.537-19.915 30.698-33.614 49.54-63.127 49.54-31.724 0-49.316-23.392-69.696-50.501-19.713-26.208-41.775-55.44-79.517-62.119v-99.736c.001-37.011 30.091-67.1 67.085-67.1zm312.19 446.374h-312.19c-36.995 0-67.084-30.089-67.084-67.1v-178.494c21.916 6.587 36.749 25.912 53.289 47.914 22.415 29.801 47.826 63.575 95.924 63.575 48.851 0 71.058-34.287 90.653-64.537 19.915-30.698 33.614-49.54 63.127-49.54 28.888 0 47.089 44.926 64.681 88.345 18.972 46.832 38.507 95.061 77.262 106.374-6.315 30.487-33.354 53.463-65.662 53.463z" />
                            <path d="m176.563 204.217c37.844 0 68.622-30.762 68.622-68.606s-30.778-68.606-68.622-68.606c-37.828 0-68.606 30.762-68.606 68.606s30.778 68.606 68.606 68.606zm0-104.4c19.739 0 35.809 16.054 35.809 35.793s-16.07 35.793-35.809 35.793-35.793-16.053-35.793-35.793 16.054-35.793 35.793-35.793z" />
                        </g>
                    </svg>
                    <p className=" text-gray-500 text-[.8rem]">
                        Add images here{" "}
                    </p>
                </div>
            </div>

            <div className="my-4">
                <div className="flex gap-3 items-center">
                    <div className="rounded-full w-5 h-5 border-solid border-slate-400 border-[1.5px]"></div>
                    <div className="text-[rgb(96,131,255)] font-semibold text-lg">
                        A
                    </div>
                    <input
                        type="text"
                        placeholder="Add answer"
                        className="bg-white rounded-md text-gray-500 placeholder:text-sm placeholder:font-semibold shadow-md outline-none  w-full px-4 py-1"
                    />
                </div>     
            </div>
            <div className="flex gap-3 items-center">
            <svg className="w-4 text-[rgb(96,131,255)] fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="_03_Login" data-name="03 Login"><path d="m256 512a25 25 0 0 1 -25-25v-462a25 25 0 0 1 50 0v462a25 25 0 0 1 -25 25z"/><path d="m487 281h-462a25 25 0 0 1 0-50h462a25 25 0 0 1 0 50z"/></g></svg>
        <p className="text-[rgb(96,131,255)] w-fit  relative  after:absolute after:w-full after:h-[1px] after:bg-[rgb(96,131,255)]  after:bottom-[1.5px] after:left-0">Add options</p>
            </div>
        </div>
    );
}
