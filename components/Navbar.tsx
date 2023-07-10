import LemonIcon from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/lemon-2.tsx";

export function Navbar() {
  return (
    <header class="bg-white">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center ">
          <div class="flex items-center flex-1">
            <LemonIcon />
            <div class="ml-1 font-bold text-blue-500">
              Fresh-Dropbox
            </div>
          </div>

          <div>
            <nav aria-label="Global">
              <ul class="flex items-center gap-6 text-sm">
              <a
                class="text-gray-500 transition hover:text-blue-500"
                href="/"
              >
                Home
              </a>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}