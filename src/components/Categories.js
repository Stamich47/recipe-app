// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import breakfast from "./assets/english-breakfast.png";
import appetizer from "./assets/appetizer.png";
import lunch from "./assets/lunch.png";
import dinner from "./assets/dinner.png";
import desserts from "./assets/desserts.png";
import salad from "./assets/salad.png";
import soup from "./assets/soup.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Categories() {
  const categories = [
    { name: "Appetizers", img: appetizer },
    {
      name: "Breakfast",
      img: breakfast,
    },
    { name: "Lunch", img: lunch },
    { name: "Dinner", img: dinner },
    { name: "Desserts", img: desserts },
    { name: "Salads", img: salad },
    { name: "Soups", img: soup },
  ];

  return (
    <div className="my-4 py-4">
      <h1 className="text-2xl my-3">Categories</h1>
      <Swiper
        modules={[Pagination, A11y, Navigation, Scrollbar]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="border border-gray-300 p-2 rounded category-card">
              <div className="flex items-center justify-center">
                <img
                  src={category.img}
                  alt={category.name}
                  className="rounded"
                />
              </div>
              <div className="text-center mt-2">
                <span className="text-lg font-semibold">{category.name}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
