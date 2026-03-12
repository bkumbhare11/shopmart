import React from "react";

export const CardSkeleton = () => (
  <section className="flex flex-wrap justify-between gap-7 px-4">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="flex flex-col bg-white border border-slate-100 shrink-0 w-full max-w-sm mx-auto mt-5 animate-pulse rounded-2xl p-4 shadow-sm"
      >
        <div className="flex flex-col gap-3">
          <div className="bg-slate-200 w-full h-36 rounded-xl mb-4"></div>
          <div className="space-y-3">
            <div className="bg-slate-200 w-full h-4 rounded-full"></div>
            <div className="bg-slate-200 w-2/3 h-4 rounded-full"></div>
            <div className="bg-slate-200 w-2/3 h-4 rounded-full"></div>
            <div className="bg-slate-200 w-2/3 h-4 rounded-full"></div>
            <div className="bg-slate-200 w-2/3 h-4 rounded-full"></div>
            <div className="bg-slate-200 w-2/3 h-4 rounded-full"></div>
          </div>
          <div className="bg-slate-200 w-20 h-6 rounded-lg"></div>{" "}
          <div className="bg-slate-200 w-full h-10 rounded-lg"></div>{" "}
        </div>
      </div>
    ))}
  </section>
);

export const DetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 mt-10">
    <div className="flex flex-col md:flex-row gap-10 animate-pulse">
      <div className="w-full md:w-1/2">
        <div className="aspect-square bg-slate-200 rounded-3xl w-full"></div>
      </div>

      <div className="flex-1 space-y-6 py-2">
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 w-1/4 rounded-full"></div>
          <div className="h-10 bg-slate-200 w-full rounded-xl"></div>
          <div className="h-10 bg-slate-200 w-2/3 rounded-xl"></div>
        </div>

        <div className="h-28 bg-slate-100 rounded-2xl w-full"></div>

        <div className="space-y-3">
          <div className="h-12 bg-slate-50 rounded-xl w-full border border-slate-100"></div>
          <div className="h-12 bg-slate-50 rounded-xl w-full border border-slate-100"></div>
          <div className="h-12 bg-slate-50 rounded-xl w-full border border-slate-100"></div>
        </div>

        <div className="flex gap-4 pt-4">
          <div className="h-14 bg-slate-200 rounded-2xl flex-1"></div>
          <div className="h-14 bg-slate-200 rounded-2xl flex-1"></div>
        </div>
      </div>
    </div>
  </div>
);
