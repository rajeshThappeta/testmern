import { useState, useEffect } from "react";
import "./Product.css";
import axios from "axios";

function Product() {
  let [products, setProducts] = useState([]);

  console.log("products is ", products);

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/product/get-products", {
        headers: { authorization: token },
      })
      .then((res) => {
        if (res.data.message === "products") {
          setProducts(res.data.payload);
        } else {
          alert(res.data.message);
        }
      });
  }, []);

  return (
    <div>
      {products.length !== 0 && (
        <div className="row row-cols-1 row-cols-sm-2 row cols-md-3 gy-4">
          {products.map((productObj) => (
            <div className="col">
              <div className="card card-body">
                <h1>{productObj.productName}</h1>
                <h3>{productObj.price}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Product;
