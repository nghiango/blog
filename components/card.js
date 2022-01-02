import Link from "next/link";
export function Card({ card }) {
  return (
    <>
      <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
        <div className="h-64 w-auto md:w-1/2">
          <img
            className="inset-0 h-full w-full object-cover object-center"
            src={card.frontmatter.cover_image}
          />
        </div>

        <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
          <h3 className="font-semibold text-lg leading-tight truncate">
            {card.frontmatter.title}
          </h3>
          <span className="inline-flex w-fit justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">
            {card.frontmatter.tag}
          </span>
          <p className="mt-2">{card.frontmatter.excerpt}</p>
          <div className="flex justify-between">
            <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
              {card.frontmatter.author} &bull; {card.frontmatter.date}
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
