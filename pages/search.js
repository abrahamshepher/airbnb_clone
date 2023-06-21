import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../Components/InfoCard";
function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MM yyyy")
    : "";
  const formattedEndDate = endDate
    ? format(new Date(endDate), "dd MM yyyy")
    : " ";
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`{location} | ${range} | ${noOfGuests} guests`} />
      <main className="flex">
        <section className="text-xs flex-grow pt-14 px-6">
          <p className="text-xs text-black">
            300+ Stays {range} - for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6 text-black ">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-6 space-x-6 text-gray-800 whitespace-nowrap">
            <p className="button text-black">Cancelletion flexibility</p>
            <p className="button text-black">Type of Place</p>
            <p className="button text-black">Price</p>
            <p className="button text-black">Rooms & Beds</p>
            <p className="button text-black">More Filters</p>
          </div>
          <div className="flex flex-col ">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;
export async function getServerSideProps() {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
