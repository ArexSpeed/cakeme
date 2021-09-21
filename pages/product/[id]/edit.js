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
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  //const [imagePreviewUrl, setImagePreviewUrl] = useState(product.imageUrl);
  const [imagePreview, setImagePreview] = useState({
    first: product.imageFirstUrl,
    second: product.imageSecondUrl,
    third: product.imageThirdUrl
  });
  const router = useRouter();

  const handleImagePreview = (e, number) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    setImagePreview({ ...imagePreview, [number]: url });
  };

  const deleteFromPreview = (number) => {
    setImagePreview({ ...imagePreview, [number]: '' });
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

    if (form.get('image1')) {
      const picture = form.get('image1');
      const file = await uploadImage(picture);
      payload.imageFirstUrl = file.secure_url;
    }
    if (form.get('image2')) {
      const picture = form.get('image2');
      const file = await uploadImage(picture);
      payload.imageSecondUrl = file.secure_url;
    }
    if (form.get('image3')) {
      const picture = form.get('image3');
      const file = await uploadImage(picture);
      payload.imageThirdUrl = file.secure_url;
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
      router.push(`/shop`);
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error?.details[0]?.message);
    }
  };

  return (
    <Layout>
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
            <label htmlFor="price">Price:(€)</label>
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
            <label htmlFor="image">Images:</label>
          </div>
          <div className="file-upload">
            {/* First image */}
            <div>
              <input
                className="file-upload__input"
                ref={image1Ref}
                type="file"
                name="image1"
                id="image1"
                onChange={(e) => handleImagePreview(e, 'first')}
              />
              <button
                className={
                  imagePreview.first === '' ? 'file-upload__button' : 'file-upload__button-hidden'
                }
                type="button"
                onClick={() => image1Ref.current.click()}>
                +
              </button>
              {imagePreview.first !== '' && (
                <div className="file-upload__imageBox">
                  <img className="file-upload__image" src={imagePreview.first} alt="" />
                  <button
                    className="file-upload__delete"
                    type="button"
                    onClick={() => deleteFromPreview('first')}>
                    <svg
                      className="file-upload__delete-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {/* Second image */}
            <div>
              <input
                className="file-upload__input"
                ref={image2Ref}
                type="file"
                name="image2"
                id="image2"
                onChange={(e) => handleImagePreview(e, 'second')}
              />
              <button
                className={
                  imagePreview.second === '' ? 'file-upload__button' : 'file-upload__button-hidden'
                }
                type="button"
                onClick={() => image2Ref.current.click()}>
                +
              </button>
              {imagePreview.second !== '' && (
                <div className="file-upload__imageBox">
                  <img className="file-upload__image" src={imagePreview.second} alt="" />
                  <button
                    className="file-upload__delete"
                    type="button"
                    onClick={() => deleteFromPreview('second')}>
                    <svg
                      className="file-upload__delete-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {/* Third image */}
            <div>
              <input
                className="file-upload__input"
                ref={image3Ref}
                type="file"
                name="image3"
                id="image3"
                onChange={(e) => handleImagePreview(e, 'third')}
              />
              <button
                className={
                  imagePreview.third === '' ? 'file-upload__button' : 'file-upload__button-hidden'
                }
                type="button"
                onClick={() => image3Ref.current.click()}>
                +
              </button>
              {imagePreview.third !== '' && (
                <div className="file-upload__imageBox">
                  <img className="file-upload__image" src={imagePreview.third} alt="" />
                  <button
                    className="file-upload__delete"
                    type="button"
                    onClick={() => deleteFromPreview('third')}>
                    <svg
                      className="file-upload__delete-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {/* End image */}
          </div>
          <button className="button" type="submit" disabled={formProcessing}>
            {formProcessing ? 'Checking...' : 'Accept'}
          </button>
          {error && <div className="form__error">{error}</div>}
        </form>
      </section>
    </Layout>
  );
}
