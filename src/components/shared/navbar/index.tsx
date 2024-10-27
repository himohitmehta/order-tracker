import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-screen-xl gap-4 px-2 py-4">
      {links.map((link) => {
        return (
          <div key={link.title}>
            <Link href={link.url}>{link.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
const links = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/",
  },
  {
    title: "Customers",
    url: "/",
  },
];
