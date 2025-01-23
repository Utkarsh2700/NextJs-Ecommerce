"use client";
import Nav from "@/components/Nav";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import Logo from "./Logo";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  const handleGoogleLogin = (e: FormEvent) => {
    e.preventDefault();
    signIn("google");
  };

  //   useGSAP(() => {
  //     gsap.from(".bg-gradient-to-r", {
  //       duration: 1,
  //       opacity: 0,
  //       skewX: 10,
  //       ease: "power1.inOut",
  //     });
  //     gsap.from("form", {
  //       duration: 1,
  //       opacity: 0,
  //       y: 100,
  //       ease: "power1.inOut",
  //       delay: 0.5,
  //     });
  //     gsap.from("h2", {
  //       duration: 1,
  //       opacity: 0,
  //       y: 100,
  //       ease: "power1.inOut",
  //       delay: 0.5,
  //     });
  //     gsap.from("input", {
  //       duration: 1,
  //       opacity: 0,
  //       y: 100,
  //       ease: "power1.inOut",
  //       delay: 0.5,
  //       stagger: 0.2,
  //     });
  //     gsap.from("button", {
  //       duration: 1,
  //       opacity: 0,
  //       y: 100,
  //       ease: "power1.inOut",
  //       delay: 0.5,
  //     });
  //   });
  if (session) {
    return (
      <div className="bg-bgGray min-h-screen">
        <div className="md:hidden flex items-center p-4">
          <button onClick={() => setShowNav(!showNav)} className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="flex grow justify-center mr-6">
            <Logo />
          </div>
        </div>
        <div className="bg-bgGray min-h-screen flex ">
          <Nav show={showNav} />
          <div className="flex grow text-black p-4 ">
            <div className="w-full">{children}</div>
            {/* <button onClick={() => signOut()}>Log Out</button> */}
          </div>
        </div>
      </div>
    );
  }
  if (!session) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-500 to-gray-900">
          <form
            className="w-full max-w-md p-10 bg-gradient-to-br from-[#b07bac] to-[#5f7367] rounded-lg shadow-xl"
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as any).email.value;
              const password = (e.target as any).password.value;
              // console.log({ email, password });
            }}
          >
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <div className="flex flex-col mt-5">
              <button
                className="bg-blue-500 text-white py-2 rounded"
                onClick={(e) => {
                  handleGoogleLogin(e);
                }}
              >
                Sign Up With Google
              </button>
              <label className="text-lg font-semibold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gradient-to-br from-[#b07bac] to-[#5f7367]"
                required
              />
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-lg font-semibold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-5 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 hover:scale-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
