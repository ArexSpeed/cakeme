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
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session && !loading) {
      router.push('/user/login');
    }
  }, [session, loading]);

  //temp wyswietlanie image
  const handleImagePreview = (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    const form = new FormData(createForm.current);
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
    console.log(payload.imageUrl, 'url image');
    if (!payload.imageUrl) {
      payload.imageUrl =
        payload.category === 'Cookies'
          ? 'https://img-premium.flaticon.com/png/512/164/164659.png?token=exp=1621429741~hmac=c2124061badbc65f9cef60a8c2c30d70'
          : payload.category === 'Cakes'
          ? 'https://img-premium.flaticon.com/png/512/817/817318.png?token=exp=1621429813~hmac=3e55d34284cf75399912a74491860470'
          : payload.category === 'Breads'
          ? 'https://img-premium.flaticon.com/png/512/3014/3014502.png?token=exp=1621429894~hmac=99ff3c77a8b96e5af5b72e6a1b5facf0'
          : payload.category === 'Donuts'
          ? 'https://img-premium.flaticon.com/png/512/3496/3496528.png?token=exp=1621429920~hmac=92aee1791b200e6f4d081dd92c9221f7'
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
            <input type="number" id="price" name="price" required />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" required />
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients:</label>
            <input type="text" id="ingredients" name="ingredients" />
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
            {formProcessing ? 'Checking...' : 'Add'}
          </button>
          {error && <div className="form__error">{error}</div>}
        </form>
      </section>
    </Layout>
  );
}
