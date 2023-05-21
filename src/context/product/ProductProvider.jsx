/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";

import { useParams, useLocation, useNavigate } from "react-router-dom";

// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../firebase/config';

import ProductContext from "./product-context";

const initialState = {
  productIsReady: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedSku: "",
  selectedSize: "",
  selectedStock: 0,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_PRODUCT": {
      return {
        ...initialState,
      };
    }
    case "SET_PRODUCT": {
      return {
        ...state,
        productIsReady: true,
        selectedProduct: action.payload.product,
        selectedVariant: action.payload.variant,
      };
    }
    case "SELECT_VARIANT": {
      return {
        ...state,
        selectedVariant: action.payload,
        selectedSku: "",
        selectedSize: "",
        selectedStock: 0,
      };
    }
    case "SELECT_SIZE": {
      return {
        ...state,
        selectedSku: action.payload.id,
        selectedSize: action.payload.value,
        selectedStock: action.payload.stock,
      };
    }
    default: {
      return state;
    }
  }
};

const ProductProvider = ({ children }) => {
  const { id: urlId } = useParams();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(productReducer, initialState);

  // const getProduct = async () => {
  //   if (state.productIsReady) {
  //     dispatch({ type: "CLEAR_PRODUCT" });
  //   }

  //   // const productsRef = collection(db, 'products');
  //   // const qProd = query(
  //   //   productsRef,
  //   //   where('variantUrls', 'array-contains', urlId)
  //   // );

  //   let product = [
  //     {
  //       id: "nQKpMhfFURiaBivxAbFS",
  //       model: "Baires",
  //       type: "gorro",
  //       variantUrls: ["gorro-baires-blanco"],
  //       tags: [
  //         { content: "nuevo", id: "1" },
  //         { id: "2", content: "capsula #01" },
  //       ],
  //       description: "gorro",
  //       variants: [
  //         {
  //           inventoryLevels: [
  //             {
  //               sku: "ACCBABLMD101",
  //               id: "ACCBABLMD101",
  //               value: "M",
  //               productId: "nQKpMhfFURiaBivxAbFS",
  //               stock: 10,
  //             },
  //           ],
  //           url: "gorro-baires-blanco",
  //           color: "blanco",
  //           variantId: "300101",
  //           price: 4150,
  //           images: [
  //             { src: "images/productos-gorro-baires-blanco-1.jpg", id: "1" },
  //             { id: "2", src: "images/productos-gorro-baires-blanco-2.jpg" },
  //           ],
  //         },
  //       ],
  //       collection: "accesorios",
  //     },
  //   ];

  //   // const productsSnapshot = await getDocs(qProd);
  //   // productsSnapshot.forEach((doc) => {
  //   //   product = { id: doc.id, ...doc.data() };
  //   // });

  //   let inventory = [];

  //   // const inventoryRef = collection(db, 'inventory');

  //   // const qInv = query(inventoryRef, where('productId', '==', product.id));
  //   // const inventorySnapshot = await getDocs(qInv);

  //   // inventorySnapshot.forEach((doc) => {
  //   //   inventory.push({ id: doc.id, ...doc.data() });
  //   // });

  //   for (let i = 0; i < product.variants.length; i++) {
  //     const variantInventoryLevels = [];
  //     for (const item of product.variants[i].inventoryLevels) {
  //       const skuInventoryLevel = inventory.find((sku) => sku.id === item.sku);

  //       variantInventoryLevels.push({ ...item, ...skuInventoryLevel });
  //     }
  //     product.variants[i].inventoryLevels = [...variantInventoryLevels];
  //   }

  //   const variant = product.variants.find((variant) => variant.url === urlId);

  //   return { product, variant };
  // };

  useEffect(() => {
    const fetchProduct = async () => {
      // const { product, variant } = await getProduct();
      let product = 
        {
          id: "nQKpMhfFURiaBivxAbFS",
          model: "Baires",
          type: "gorro",
          variantUrls: ["gorro-baires-blanco"],
          tags: [
            { content: "nuevo", id: "1" },
            { id: "2", content: "capsula #01" },
          ],
          description: "gorro",
          variants: [
            {
              inventoryLevels: [
                {
                  sku: "ACCBABLMD101",
                  id: "ACCBABLMD101",
                  value: "M",
                  productId: "nQKpMhfFURiaBivxAbFS",
                  stock: 10,
                },
              ],
              url: "gorro-baires-blanco",
              color: "blanco",
              variantId: "300101",
              price: "4150",
              images: [
                { src: "images/product-gorro-baires-blanco-1.jpg", id: "1" },
                { id: "2", src: "images/product-gorro-baires-blanco-2.jpg" },
              ],
            },
          ],
          collection: "accesorios",
        }
      
      let variant = 
        {
          price: "4150",
          url: "gorro-baires-blanco",
          variantId: "300101",
          images: [
            {
              id: "1",
              src: "images/product-gorro-baires-blanco-1.jpg",
            },
            {
              src: "images/product-gorro-baires-blanco-2.jpg",
              id: "2",
            },
          ],
          inventoryLevels: [
            {
              sku: "ACCBABLMD101",
              id: "ACCBABLMD101",
              stock: "10",
              productId: "nQKpMhfFURiaBivxAbFS",
              value: "M",
            },
          ],
          color: "blanco",
        }
     

      dispatch({ type: "SET_PRODUCT", payload: { product, variant } });
    };

    fetchProduct();
  }, [urlId]);

  useEffect(() => {
    if (locationState === "/product") {
      const fetchProduct = async () => {
        // const { product, variant } = await getProduct();
        let product = 
          {
            id: "nQKpMhfFURiaBivxAbFS",
            model: "Baires",
            type: "gorro",
            variantUrls: ["gorro-baires-blanco"],
            tags: [
              { content: "nuevo", id: "1" },
              { id: "2", content: "capsula #01" },
            ],
            description: "gorro",
            variants: [
              {
                inventoryLevels: [
                  {
                    sku: "ACCBABLMD101",
                    id: "ACCBABLMD101",
                    value: "M",
                    productId: "nQKpMhfFURiaBivxAbFS",
                    stock: "10",
                  },
                ],
                url: "gorro-baires-blanco",
                color: "blanco",
                variantId: "300101",
                price: "4150",
                images: [
                  {
                    src: "images/product-gorro-baires-blanco-1.jpg",
                    id: "1",
                  },
                  {
                    id: "2",
                    src: "images/product-gorro-baires-blanco-2.jpg",
                  },
                ],
              },
            ],
            collection: "accesorios",
          }
        ;
        let variant = 
          {
            price: "4150",
            url: "gorro-baires-blanco",
            variantId: "300101",
            images: [
              {
                id: "1",
                src: "images/product-gorro-baires-blanco-1.jpg",
              },
              {
                src: "images/product-gorro-baires-blanco-2.jpg",
                id: "2",
              },
            ],
            inventoryLevels: [
              {
                sku: "ACCBABLMD101",
                id: "ACCBABLMD101",
                stock: "10",
                productId: "nQKpMhfFURiaBivxAbFS",
                value: "M",
              },
            ],
            color: "blanco",
          }
      

        dispatch({ type: "SET_PRODUCT", payload: { product, variant } });
        navigate(".");
      };

      fetchProduct();
    }
  }, [locationState]);

  console.log("product-context", state);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
