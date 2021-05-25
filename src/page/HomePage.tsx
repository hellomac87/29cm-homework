import { getProducts } from "data/productItems";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    getProducts().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>29cm homework</div>;
}

export default HomePage;
