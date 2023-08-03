import type { Signal } from "@preact/signals";

interface CreateProps {
  isOpen: Signal<boolean>;
}

export default function CreateButton(props: CreateProps) {
  const openModal = () => {
    props.isOpen.value = true;
  }

  return(
    <button
    type="button"
    class="inline-flex items-center gap-1.5 border border-blue-400 bg-blue-400 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-500 hover:bg-blue-500 focus:ring focus:ring-blue-500"
    onClick={openModal}>
      <svg viewBox="0 0 24 24" fill="none" class="dig-UIIcon dig-UIIcon--standard" width="24" height="24" role="presentation" focusable="false"><path d="M11.75 4.5V19M19 11.75H4.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path></svg>
      Create
    </button>
  );
  
}