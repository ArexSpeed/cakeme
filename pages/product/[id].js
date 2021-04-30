import Layout from 'components/Layout';
import ProductSite from 'components/ProductSite';
import { getProduct, getProducts, getBakeryProducts } from 'services/products/getProduct';

export const getStaticPaths = async () => {
  const products = await getProducts();

  return {
    paths: products.map((product) => ({
      params: { id: String(product.id) }
    })),
    fallback: true
  };
};

export const getStaticProps = async ({ params }) => {
  const product = await getProduct(params.id);
  const bakeryProducts = await getBakeryProducts(product.bakery[0]);

  return {
    revalidate: 30,
    props: {
      product,
      bakeryProducts,
      metaTitle: product.name,
      metaDescription: product.description
    }
  };
};

export default function ProductPage({ product, bakeryProducts }) {
  return (
    <Layout>
      <main className="main">
        <ProductSite product={product} bakeryProducts={bakeryProducts} />
      </main>
    </Layout>
  );
}
