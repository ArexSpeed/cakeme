import { useRef, useState, useEffect, useContext } from 'react';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { uploadImage } from 'utils';
import { GlobalContext } from 'context/ContextProvider';

export default function ProductCreate() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContext(GlobalContext);
  const createForm = useRef();
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState({
    first: '',
    second: '',
    third: ''
  });
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session && !loading) {
      router.push('/user/login');
    }
  }, [session, loading]);

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
    const form = new FormData(createForm.current);
    const payload = {
      name: form.get('name'),
      category: form.get('category'),
      price: form.get('price'),
      description: form.get('description'),
      ingredients: form.get('ingredients'),
      location: form.get('location'),
      score: 5
    };

    if (form.get('image1')) {
      console.log('image1');
      const picture = form.get('image1');
      console.log(picture, 'picture');
      const file = await uploadImage(picture);
      payload.imageFirstUrl = file.secure_url;
    }
    if (form.get('image2')) {
      console.log('image2');
      const picture = form.get('image2');
      const file = await uploadImage(picture);
      payload.imageSecondUrl = file.secure_url;
    }
    if (form.get('image3')) {
      const picture = form.get('image3');
      const file = await uploadImage(picture);
      payload.imageThirdUrl = file.secure_url;
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      dispatch({
        type: 'SET_ACTION_INFO',
        payload: { active: true, text: `You added ${payload.name}` }
      });
      router.push('/shop');
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error?.details[0]?.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !session) {
    return <div>Redirecting...</div>;
  }

  return (
    <Layout>
      <section className="section">
        <div className="form__triangle"></div>
        <h2>Add new product:</h2>
        <form className="form" onSubmit={handleSubmit} ref={createForm}>
          <div>
            <label htmlFor="name">Product name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select name="category" id="category">
              <option value="Cakes">Cakes</option>
              <option value="Breads">Breads</option>
              <option value="Donuts">Donuts</option>
              <option value="Cookies">Cookies</option>
            </select>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" required />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" placeholder="100" required />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" placeholder="City" required />
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients:</label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              placeholder="chocolate, strawberry"
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
          {/* <div className="form__images">
            <img src={imagePreview.first} alt="" />
          </div> */}
          {/* {imagePreviewIndex !== null && (
            <div className="form__images">
              <img src={imagePreviewUrl[imagePreviewIndex]} alt="" />
              <div className="product__images-small">
                {imagePreviewUrl.map((item, i) => (
                  <button key={i} onClick={() => setImagePreviewIndex(i)} type="button">
                    <img src={item} alt="img" />
                  </button>
                ))}
              </div>
            </div>
          )} */}
          <button className="form__submit" type="submit" disabled={formProcessing}>
            {formProcessing ? 'Checking...' : 'Add'}
          </button>
          {error && <div className="form__error">{error}</div>}
        </form>
      </section>
    </Layout>
  );
}
