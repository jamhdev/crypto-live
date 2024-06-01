"use client";
import React, { useCallback } from "react";
import CarouselItem from "../CarouselItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import LoadingCircleLine from "@/public/LoadingCircleLineSvg.svg";
import CarouselItemMobile from "./CarouselItemMobile";
export default function HomeCarouselSectionMobile({
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
    <div
      className="embla__slide h-[78px] flex justify-center items-center"
      key={value.id}
    >
      <CarouselItemMobile {...value} />
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
