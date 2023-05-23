import * as React from "react";

const Cuisines = ({ cuisine, title }: any) => {
  return (
    <div className="space-y-4">
      <p className="text-3xl font-bold text-center">{title}</p>
      <div className="grid grid-cols-4 gap-6">
        {cuisine.map((item: any, index: any) => (
          <div
            className="text-center p-4 border border-black hover:bg-black hover:text-white hover:cursor-pointer"
            key={index}
          >
            <a href={item.slug}>
              {item.c_cuisines ? item.c_cuisines[0] : "none"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cuisines;
