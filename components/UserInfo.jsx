"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import ShuffleHero from "./homeSection";

export default function UserInfo() {
  const { data: session } = useSession();

  useEffect(() => {
    const handleLogoutOnClose = async (event) => {
      // Call signOut when the window is being closed
      await signOut();
    };

    window.addEventListener("beforeunload", handleLogoutOnClose);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleLogoutOnClose);
    };
  }, []);

  return (
    <div>
      <header>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              /> */}
            </a>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-400 text-white rounded font-bold px-6 py-2 mt-3"
          >
            Log Out
          </button>
        </nav>
      </header>
      <ShuffleHero />
    </div>
  );
}
