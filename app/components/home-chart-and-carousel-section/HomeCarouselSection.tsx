"use client";
import React, { useCallback } from "react";
import CarouselItem from "./CarouselItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import LoadingCircleLine from "@/public/LoadingCircleLineSvg.svg";
export default function HomeCarouselSection({
  coinSelected,
  setCoinSelected,
}: any) {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.tableData
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    loop: true,
    slidesToScroll: 4,
  });

  const slideData = data.map((value) => (
    <div className="embla__slide" key={value.id}>
      <CarouselItem {...value} />
    </div>
  ));

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading)
    return (
      <>
        <div className="w-full relative mt-10">
          <button className="embla__prev w-14 h-14 bg-gradient-to-b from-selectedGradient to-highlightColor p-[1px] rounded-full flex justify-center items-center transition-all absolute left-2 z-10 top-[10px] border-4 border-background hover:border-0">
            <div className="bg-highlightColor w-full h-full rounded-full flex justify-center items-center text-white text-center">
              &lt;
            </div>
          </button>

          <button className="embla__prev w-14 h-14 bg-gradient-to-b from-selectedGradient to-highlightColor p-[1px] rounded-full justify-center items-center transition-all absolute right-2 z-10 top-[10px] border-4 border-background hover:border-0">
            <div className="bg-highlightColor w-full h-full rounded-full flex justify-center items-center text-white text-center">
              &gt;
            </div>
          </button>
          <div className="w-full flex gap-2 px-10 h-[78px] justify-center items-center">
            <div className="w-[264px] h-[78px] border-highlightColor border-4 rounded-lg flex justify-center items-center">
              <LoadingCircleLine />
            </div>
            <div className="w-[264px] h-[78px] border-highlightColor border-4 rounded-lg flex justify-center items-center">
              <LoadingCircleLine />
            </div>
            <div className="w-[264px] h-[78px] border-highlightColor border-4 rounded-lg flex justify-center items-center">
              <LoadingCircleLine />
            </div>
            <div className="w-[264px] h-[78px] border-highlightColor border-4 rounded-lg flex justify-center items-center">
              <LoadingCircleLine />
            </div>
            <div className="w-[264px] h-[78px] border-highlightColor border-4 rounded-lg flex justify-center items-center">
              <LoadingCircleLine />
            </div>
          </div>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <div className="w-full relative mt-10">
          <button className="embla__prev w-14 h-14 bg-gradient-to-b from-selectedGradient to-highlightColor p-[1px] rounded-full flex justify-center items-center transition-all absolute left-2 z-10 top-[10px] border-4 border-background hover:border-0">
            <div className="bg-highlightColor w-full h-full rounded-full flex justify-center items-center text-white text-center">
              &lt;
            </div>
          </button>

          <button className="embla__prev w-14 h-14 bg-gradient-to-b from-selectedGradient to-highlightColor p-[1px] rounded-full justify-center items-center transition-all absolute right-2 z-10 top-[10px] border-4 border-background hover:border-0">
            <div className="bg-highlightColor w-full h-full rounded-full flex justify-center items-center text-white text-center">
              &gt;
            </div>
          </button>
          <div className="w-full flex gap-2 px-10 h-[78px] justify-center items-center">
            <div className="w-full h-[78px] border-highlightColor border-4 rounded-lg flex justify-center items-center text-themeTextColor">
              Error loading carousel
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="w-full relative mt-10">
        <button
          className="embla__prev w-14 h-14 bg-gradient-to-b from-selectedGradient to-highlightColor p-[1px] rounded-full flex justify-center items-center transition-all absolute left-2 z-10 top-[10px] border-4 border-background hover:border-0"
          onClick={scrollPrev}
        >
          <div className="bg-highlightColor w-full h-full rounded-full flex justify-center items-center text-white text-center">
            &lt;
          </div>
        </button>

        <button
          className="embla__prev w-14 h-14 bg-gradient-to-b from-selectedGradient to-highlightColor p-[1px] rounded-full justify-center items-center transition-all absolute right-2 z-10 top-[10px] border-4 border-background hover:border-0"
          onClick={scrollNext}
        >
          <div className="bg-highlightColor w-full h-full rounded-full flex justify-center items-center text-white text-center">
            &gt;
          </div>
        </button>
        <div className="w-full flex flex-col gap-2 px-10">
          <div
            ref={emblaRef}
            className="flex text-themeTextColor embla"
            //overflow-x-scroll no-scrollbar
          >
            <div className="embla__container">{slideData}</div>
          </div>
        </div>
      </div>
    </>
  );
}
