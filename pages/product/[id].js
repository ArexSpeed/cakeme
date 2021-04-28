import Layout from 'components/Layout';
import ProductSite from 'components/ProductSite';
import getOffers from 'services/offers/getOffers';
import getProduct from 'services/offers/getProduct';
import getBakeryOffers from 'services/offers/getBakeryOffers';

export const getStaticPaths = async () => {
  const offers = await getOffers();

  return {
    paths: offers.map((offer) => ({
      params: { id: String(offer.id) }
    })),
    fallback: true
  };
};

export const getStaticProps = async ({ params }) => {
  const product = await getProduct(params.id);
  const bakeryProducts = await getBakeryOffers(product.bakery[0]);
  console.log(bakeryProducts, 'bakry in static props');
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
  console.log(bakeryProducts, 'bakery in productpage');
  return (
    <Layout>
      <main className="main">
        <ProductSite product={product} bakeryProducts={bakeryProducts} />
      </main>
    </Layout>
  );
}
