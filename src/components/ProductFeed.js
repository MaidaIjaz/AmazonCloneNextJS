import React from "react";
import Product from "./Product";

function ProductFeed({ products }) {
  return (
    // show single product on small screen, 2 on medium and so on...
    // Overlap products with banner on medium screen
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {/* // Use SSR to fetch all products from fakestore API (REST API)
    // Fetch data from API render page on server and then deliver it to browser */}
      {/* destructuring */}
      {/* Whenever use map always include key to let it know which element belongs where in this way it renders list efficiently */}
      {products
        //  Take first four products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}

      <img className="md:col-span-full m-auto" src="/product.jpg" alt="" />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          ))}
      </div>

      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
