import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex gap-4 mx-auto max-w-screen-xl px-2">
      {links.map((link) => {
        return (
          <div>
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
    url: "/products",
  },
  {
    title: "Customers",
    url: "/customers",
  },
];
