"use client";
import React, { useCallback } from "react";
import CarouselItem from "./CarouselItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
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
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between p-2">
          <button
            className="embla__prev w-14 h-14 bg-highlightColor text-themeTextColor shadow-sm rounded-full flex justify-center items-center transition-all hover:scale-110 hover:shadow-lg"
            onClick={scrollPrev}
          >
            &lt;
          </button>
          <button
            className="embla__next w-14 h-14 bg-highlightColor text-themeTextColor shadow-sm rounded-full justify-center items-center transition-all hover:scale-110 hover:shadow-lg"
            onClick={scrollNext}
          >
            &gt;
          </button>
        </div>
        <div
          ref={emblaRef}
          className="flex text-themeTextColor embla"
          //overflow-x-scroll no-scrollbar
        >
          <div className="embla__container">{slideData}</div>
        </div>
      </div>
    </>
  );
}
