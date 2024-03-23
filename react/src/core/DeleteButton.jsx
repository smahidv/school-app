import { TrashIcon } from "@heroicons/react/24/outline";

export default function ({onClick}) {
    return (
        
            <button
                type="button"
                className="
              flex
              items-center
              text-xs
              rounded-sm
              border-none
              text-red-500
              hover:border-red-600
              font-semibold
            "
                onClick={onClick}
            >
                <TrashIcon className="w-4" />
                Delete
            </button>
      
    );
}
