import type { Signal } from "@preact/signals";

interface CreateProps {
  isOpen: Signal<boolean>;
}

export default function CreateModal(props: CreateProps) {
  const closeModal = () => {
    props.isOpen.value = false;
  }

  if (!props.isOpen.value) {
    return <span></span>;
  }

  return(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Create Folder</h2>
        <form method="POST">
          <div className="mb-4">
            <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
              Folder name
            </label>
            <input
              type="text"
              id="inputField"
              name="folder"
              className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}