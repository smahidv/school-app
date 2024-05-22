
export default function ExamQuestion({
    questions,
    current_page,
    handleReview,
    reviewed,
    answers,
    handleAnswerChange
}) {
 

    return (
        <>
            {questions &&
                questions.map((question) => (
                    <div key={question.id}>
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                className={`h-fit self-end border-gray-400 border-solid border-[1px] px-6 rounded-full ${
                                    reviewed[current_page]
                                        ? "bg-yellow-400 border-none shadow-md"
                                        : "bg-[rgb(238,242,255)]"
                                }`}
                                onClick={() => handleReview(current_page)}
                            >
                                <small className="text-gray-600">
                                    Mark as review
                                </small>
                            </button>
                        </div>
                        <div className="space-y-8 border-t-solid border-t-[1.5px] border-gray-400 w-[80dvw] mt-6 mb-10">
                            <div className="p-6 bg-gray-100 shadow-sm">
                                <p className="font-bold text-gray-700">
                                    Question {current_page}
                                </p>
                                <p className="text-gray-950">
                                    {question.question}
                                </p>
                            </div>
                            <div
                                className={`p-6 bg-gray-100 shadow-sm space-y-7 border-t-solid border-t-[1.5px] border-gray-400
                             ${
                                 question.images && question.images.length > 0 &&
                                 "flex gap-20" 
                             }`}
                            >
                                {question.images && question.images.length > 0 &&(
                                    <div className="grid gap-6">
                                        {question.images.map(
                                            (imageUrl, index) => (
                                                <img
                                                    className="aspect-square"
                                                    key={index}
                                                    src={imageUrl}
                                                    alt=""
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                                <div
                                    className={` ${ question.images && "space-y-6" } `}
                                >
                                    {question.options &&
                                        question.options.map((opt, i) => {
                                            const isChecked =
                                                answers[question.id]?.includes(
                                                    opt.option
                                                ) || false;
                                               
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex gap-4 items-center"
                                                >
                                                    <div
                                                        className={`relative rounded-full flex items-center justify-center aspect-square min-w-[30px] text-white border-solid border-white border-[2px] font-semibold ${
                                                            isChecked
                                                                ? "bg-purple-600"
                                                                : "bg-gray-500"
                                                        }`}
                                                    >
                                                        <label
                                                            htmlFor={`${
                                                                question.id
                                                            }-${String(
                                                                opt.option
                                                            )}`}
                                                        >
                                                            {String.fromCharCode(
                                                                65 + i
                                                            )}
                                                        </label>

                                                        <input
                                                            className="absolute bottom-[-15%] right-[-15%] rounded-sm focus:ring-offset-0 focus:ring-0 text-purple-600 border-none  "
                                                            // type={`${question.type =="checkbox" && "checkbox"} ${question.type =="radio" && "radio"}`}
                                                            type="checkbox"
                                                            id={`${
                                                                question.id
                                                            }-${String(
                                                                opt.option
                                                            )}`}
                                                            value={String(
                                                                opt.option
                                                            )}
                                                            checked={isChecked}
                                                            onChange={(ev) => {
                                                                handleAnswerChange(
                                                                    question.id,
                                                                    ev.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="text-gray-950">
                                                        {opt.option}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}
