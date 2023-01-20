import Link from "next/link";
import React from "react";
import { Post } from "../interfaces";
import { formatDate } from "../utils/date-utils";

interface CardProps {
  card: Post;
}

export function Card(props: CardProps) {
  const { card } = props;
  const renderTags = () => {
    return Array.from(card.data?.tag).map((tag: string, index) => {
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
          <img
            className="inset-0 h-full w-full object-cover object-center"
            src={`${process.env.BASE_PATH}${card.data.cover_image}`}
          />
        </div>

        <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
          <Link href={`${card.link}`} passHref>
            <h3 className="font-semibold text-2xl leading-tight truncate cursor-pointer">
              {card.data.title}
            </h3>
          </Link>
          {/* <span className="inline-flex w-fit justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">
            {card.data.tag}
          </span> */}
          {/* <div className="flex">{renderTags()}</div> */}

          <p className="mt-2">{card.data.excerpt}</p>
          <div className="flex justify-between">
            <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
              {formatDate(card.data.date)}
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
