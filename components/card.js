export function Card({ card }) {
  return (
    <>
      <div
        className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2"
      >
        <div className="h-64 w-auto md:w-1/2">
          <img
            className="inset-0 h-full w-full object-cover object-center"
            src="card.img"
          />
        </div>

        <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
          <h3 className="font-semibold text-lg leading-tight truncate">
            {card.title}
          </h3>
          <p className="mt-2">{card.excerpt}</p>
          <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
            {card.author} &bull; {card.date}
          </p>
        </div>
      </div>
    </>
  );
}
