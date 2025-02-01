/** @format */

import Link from "next/link";

const Tabs = () => {
  return (
    <div className="flex gap-3 mb-10">
      <Link href='' className="bg-default py-2 px-3 text-sm flex items-center rounded-lg hover:bg-secondary">
        Products
      </Link>
    </div>
  );
};

export default Tabs;
