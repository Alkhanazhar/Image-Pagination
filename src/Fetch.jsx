import React, { useEffect, useState } from "react";

const Fetch = () => {
  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1);
  const selectpagehandler = (selectedpage) => {
    if (
      selectedpage > 0 &&
      selectedpage <= products.length / 10 &&
      selectedpage !== page
    )
      setpage(selectedpage);
  };
  async function api() {
    const res = await fetch("https://picsum.photos/v2/list?page=2&limit=100");
    const data = await res.json();
    if (data.length > 0) {
      setproducts(data);
    }
  }
  useEffect(() => {
    api();
  }, []);
  return (
    <div>
      {products.length > 0 && (
        <div className="grid xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span
                key={product.id}
                className="h-[280px] p-2 rounded-md shadow-sm m-2 sm:m-0 bg-slate-300"
              >
                <img
                  src={product.download_url}
                  alt=""
                  className="w-[100%] h-[100%]"
                />
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="flex p-4  border-2 justify-center items-center cursor-pointer">
          <span
            className="p-[10px] m-[10px] border-2 sm:m-0"
            onClick={() => {
              selectpagehandler(page - 1);
            }}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={
                  page == i + 1
                    ? "bg-slate-400 p-[10px] xl:m-[10px] border-2 sm:m-0 "
                    : "p-[10px] xl:m-[10px] sm:m-0 border-2 "
                }
                onClick={() => {
                  selectpagehandler(i + 1);
                }}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className="p-[10px] m-[10px] border-2"
            onClick={() => {
              selectpagehandler(page + 1);
            }}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default Fetch;
