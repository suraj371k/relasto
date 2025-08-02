import FiltersSidebar from "@/components/FiltersSidebar";
import Properties from "@/components/Properties";

const Listings = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-10 container mx-auto">
      <div className="mt-16">
        <FiltersSidebar />
      </div>
      <div>
        <Properties />
      </div>
    </div>
  );
};

export default Listings;
