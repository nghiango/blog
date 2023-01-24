/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/utils/clientUtils.service";
import { PostData } from "@/stores/postStore";
import Link from "next/link";
import React from "react";

interface CardProps {
  card: PostData;
}

export function Card(props: CardProps) {
  const { card } = props;
  const renderTags = () => {
    const tags = card?.metaData?.tag?.split(',');
    return (tags||[]).map((tag: string, index: number) => {
      return (
        <span
          key={index}
          className="inline-flex w-fit justify-center px-2 py-1 mr-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded"
        >
          {tag}
        </span>
      );
    });
  };
  return (
    <>
      <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
        <div className="h-64 w-auto md:w-1/2">
          <Link href={`${card.link}`} passHref>
            <img
              className="inset-0 h-full w-full object-cover object-center"
              src={`${process.env.BASE_PATH}${card.metaData.cover_image}`}
              alt='cover-image'
            />
          </Link>
        </div>

        <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
          <Link href={`${card.link}`} passHref>
            <h3 className="font-semibold text-2xl leading-tight truncate cursor-pointer">
              {card.metaData.title}
            </h3>
          </Link>

          <div className="flex">{renderTags()}</div>

          <p className="mt-2">{card.metaData.excerpt}</p>
          <div className="flex justify-between">
            <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
              {formatDate(card.metaData.date)}
            </p>
            <Link href={`${card.link}`} passHref>
              <button className="p-2 bg-white hover:bg-gray-600 hover:text-white border border-solid border-grey py-2">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
