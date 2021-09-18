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
  const fileRef = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const [imagePreviewIndex, setImagePreviewIndex] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session && !loading) {
      router.push('/user/login');
    }
  }, [session, loading]);

  //temp wyswietlanie image
  const handleImagePreview = (e) => {
    console.log(e.target.files, 'all files');
    const files = Array.from(e.target.files);
    const urls = files.map((file) => window.URL.createObjectURL(file));
    const oneurl = window.URL.createObjectURL(e.target.files[0]);
    setImagePreviewUrl(urls);
    setImagePreviewIndex(0);
    console.log(files, 'files');
    console.log(urls, 'urls');
    console.log(oneurl, 'one url');
    console.log(imagePreviewUrl, 'preview');
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
      location: form.get('location')
    };

    if (form.get('image')) {
      const picture = form.get('image');
      const file = await uploadImage(picture);
      payload.imageUrl = file.secure_url;
    }

    if (!payload.imageUrl) {
      payload.imageUrl =
        payload.category === 'Cookies'
          ? 'https://res.cloudinary.com/dbpsxmtcb/image/upload/v1621685454/zumsucm6bpzihfxysxut.png'
          : payload.category === 'Cakes'
          ? 'https://res.cloudinary.com/dbpsxmtcb/image/upload/v1621683749/jhsptiqv4ejfp5i3oq2h.png'
          : payload.category === 'Breads'
          ? 'https://res.cloudinary.com/dbpsxmtcb/image/upload/v1621685356/xct3ve9xt1tckoaglq8g.png'
          : payload.category === 'Donuts'
          ? 'https://res.cloudinary.com/dbpsxmtcb/image/upload/v1621685424/d648xaav7joomyviafji.jpg'
          : '';
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
      router.push('/product/my');
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
            <input type="number" id="price" name="price" placeholder="100,00" required />
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
          <div className="file-upload">
            <label htmlFor="image">Image:*</label>
            <input
              className="file-upload__input"
              ref={fileRef}
              type="file"
              name="image"
              id="image"
              multiple
              onChange={handleImagePreview}
            />
            <button
              className="file-upload__button"
              type="button"
              onClick={() => fileRef.current.click()}>
              Choose File(s)
            </button>
            <span className="file-upload__label"></span>
          </div>
          <div className="form__ps">*max 5 files, first is main</div>
          {imagePreviewIndex !== null && (
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
          )}
          <button className="form__submit" type="submit" disabled={formProcessing}>
            {formProcessing ? 'Checking...' : 'Add'}
          </button>
          {error && <div className="form__error">{error}</div>}
        </form>
      </section>
    </Layout>
  );
}
