import { useState, useRef, useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { uploadImage } from 'utils';
import { getProduct } from 'services/products/getProduct';
import isAuthorized from 'services/products/isAuthorized';

export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const product = await getProduct(query.id);

  if (!isAuthorized(product, session) || !product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product
    }
  };
};

export default function EditPage({ product }) {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContext(GlobalContext);
  const editForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(product.imageUrl);
  const router = useRouter();

  const handleImagePreview = (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    const form = new FormData(editForm.current);
    const picture = form.get('image');
    console.log(picture, 'picture one');
    console.log(`url`, url);
    setImagePreviewUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(editForm.current);

    const payload = {
      name: form.get('name'),
      category: form.get('category'),
      price: form.get('price'),
      description: form.get('description'),
      ingredients: form.get('ingredients'),
      location: form.get('location')
    };

    if (form.get('image')) {
      const picture = form.get('image');
      const file = await uploadImage(picture);
      payload.imageUrl = file.secure_url;
    }

    const response = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      dispatch({
        type: 'SET_ACTION_INFO',
        payload: { active: true, text: `Updated ${payload.name} correct` }
      });
      router.push(`/product/my`);
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error?.details[0]?.message);
    }
  };

  return (
    <Layout>
      <main className="main">
        <section className="section">
          <h2>Edit {product.name}: </h2>
          <form className="form" onSubmit={handleSubmit} ref={editForm}>
            <div>
              <label htmlFor="name">Product name:</label>
              <input type="text" id="name" name="name" defaultValue={product.name} required />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select name="category" id="category" defaultValue={product.category}>
                <option value="Cakes">Cakes</option>
                <option value="Breads">Breads</option>
                <option value="Donuts">Donuts</option>
                <option value="Cookies">Cookies</option>
              </select>
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                defaultValue={product.description}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" defaultValue={product.price} required />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={product.location}
                required
              />
            </div>
            <div>
              <label htmlFor="ingredients">Ingredients:</label>
              <input
                type="text"
                id="ingredients"
                name="ingredients"
                defaultValue={product?.ingredients}
              />
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" onChange={handleImagePreview} />
            </div>
            {imagePreviewUrl && (
              <div>
                <img src={imagePreviewUrl} alt="" />
              </div>
            )}
            <button type="submit" disabled={formProcessing}>
              {formProcessing ? 'Checking...' : 'Accept'}
            </button>
            {error && <div className="form__error">{error}</div>}
          </form>
        </section>
      </main>
    </Layout>
  );
}
