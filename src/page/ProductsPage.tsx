import Error from "components/Error";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { fetchProducts } from "store/slices/productsSlice";

function ProductsPage() {
  const dispatch = useDispatch();

  const { fetching, error, data, per_page } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (fetching || !data) return <Loader />;
  if (error) return <Error />;

  return (
    <>
      <ul>
        {data.map((product) => (
          <li key={product.item_no}>
            <div>
              <img src={product.detail_image_url} alt={product.item_name} />
            </div>
            <div>{product.price}</div>
            <div>{product.item_name}</div>
          </li>
        ))}
      </ul>
      <Pagination per_page={per_page} total={data.length} />
    </>
  );
}

export default ProductsPage;
