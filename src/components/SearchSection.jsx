import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SearchSection() {
  const categoriesList = useSelector((state) => state.product.categories);
  const products = useSelector((state) => state.product.products);
  const [searchVal, setSearchVal] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [debounceQuery, setDebounceQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activeFilter = searchParams.get("sort") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(searchVal);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchVal]);

  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debounceQuery.toLowerCase()),
  );

  const sortOptions = [
    { label: "Relevance (Default)", value: "" },
    { label: "Price -- Low to High", value: "price-low" },
    { label: "Price -- High to Low", value: "price-high" },
    { label: "Customer Rating", value: "ratings" },
  ];
  const currentsort = sortOptions.find((sort) => sort.value === activeFilter);

  function handleCategory(value) {
    setSearchParams((prev) => {
      if (value) {
        prev.set("category", value);
      } else {
        prev.delete("category");
      }
      return prev;
    });
  }

  function handleSort(value) {
    setSearchParams((prev) => {
      if (value) {
        prev.set("sort", value);
      } else {
        prev.delete("sort"); // Relevance ke liye delete kar do
      }
      return prev;
    });

    setTimeout(() => {
      setIsSheetOpen(false);
    }, 400);
  }

  function clearFilters() {
    setSearchParams({});
    currentsort.value = "";

    setTimeout(() => {
      setIsSheetOpen(false);
    }, 400);
  }

  return (
    <section className="flex flex-col gap-2 ">
      <div className="relative bottom-0">
        <div className="flex gap-2 border p-2.5 sm:p-4 rounded-xl border-slate-200 bg-slate-50 focus-within:border-slate-900 ">
          <label htmlFor="search" className="text-slate-400">
            <SearchOutlinedIcon className="text-xl!" />
          </label>
          <input
            type="text"
            id="search"
            value={searchVal}
            className=" focus:outline-none focus:border-none w-full placeholder:text-slate-400 placeholder:text-sm bg-transparent sm:text-lg"
            placeholder="Search Products..."
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>

        {searchVal !== "" && (
          <div className="absolute bg-slate-50 w-full z-50 rounded-bl-xl rounded-br-xl p-4">
            {searchVal !== debounceQuery ? (
              <div className="text-slate-500 font-bold text-xs text-center p-4 sm:text-lg">
                Loading...
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="flex gap-1.5 items-center mb-2 "
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-8 h-8 sm:h-20 sm:w-20"
                  />

                  <span className="text-xs font-semibold sm:text-[16px]">
                    {product.title}
                  </span>
                </Link>
              ))
            ) : (
              <div className="p-6 flex flex-col gap-2 items-center justify-center text-center">
                <div className="bg-slate-100 p-2 mb-2 rounded-full text-slate-900">
                  <SearchOutlinedIcon
                    sx={{
                      fontSize: {
                        xs: "1.8rem",
                      },
                    }}
                  />
                </div>
                <p className="text-sm font-bold text-slate-800 sm:text-xl">
                  No products found!
                </p>

                <p className="text-xs text-slate-500 sm:text-lg">
                  We couldn’t find anything matching{" "}
                  <span className="font-bold text-blue-500 italic">
                    "{searchVal}"
                  </span>
                </p>

                <button
                  className="text-blue-500 font-bold text-xs hover:underline mt-1.5 sm:text-lg"
                  onClick={() => setSearchVal("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {categoriesList && categoriesList.length > 0 && (
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap py-2 px-2 no-scrollbar text-slate-900">
          <button
            className={`shrink-0 px-4 py-1.5 rounded-full  font-semibold text-sm cursor-pointer ${!activeCategory ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-600"}`}
            onClick={() => handleCategory("")}
          >
            All
          </button>

          {categoriesList.map((category) => (
            <button
              key={category.name}
              className={`shrink-0 px-4 py-1.5 cursor-pointer rounded-full font-semibold text-sm sm:text-[16px]  ${activeCategory === category.slug ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-600"}`}
              onClick={() => handleCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger
            className={`"border px-3 py-2 font-semibold cursor-pointer rounded-full border-slate-200 transition-all duration-300 ease-in-out text-xs sm:text-sm flex gap-1 items-end" ${currentsort.value !== "" ? "bg-black text-white" : "text-slate-900 bg-slate-100"}`}
          >
            <SwapVertIcon
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.3rem",
                },
              }}
            />
            {currentsort.label}
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader className="border-b">
              <SheetTitle className="uppercase text-slate-900">
                Sort by
              </SheetTitle>
              <SheetDescription>
                Select how you want to view the products
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 px-4 mb-4 items-start ">
              {sortOptions.map((item) => {
                const isActive = item.value === activeFilter;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSort(item.value)}
                    className={` text-sm transition-all ${
                      isActive ? "text-slate-900 font-bold" : " text-gray-700"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                className="font-semibold text-sm text-red-500"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <span className="text-xs sm:text-sm text-slate-400 font-medium">
          {products.length} Products
        </span>
      </div>
    </section>
  );
}

export default SearchSection;
