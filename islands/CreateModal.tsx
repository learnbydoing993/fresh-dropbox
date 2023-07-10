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
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded shadow-lg">
        <h2 class="text-lg font-semibold mb-4">Create Folder</h2>
        <form method="POST">
          <div class="mb-4">
            <label htmlFor="inputField" class="block text-sm font-medium text-gray-700">
              Folder name
            </label>
            <input
              type="text"
              id="inputField"
              name="folder"
              required
              class="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <div class="flex justify-between">
            <button
              type="button"
              class="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}