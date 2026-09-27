import { useState } from 'react';
import api from '../services/api';

// Trang mẫu: form tạo user, upload avatar, gọi API backend
function CreateUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (avatar) formData.append('avatar', avatar);

      const res = await api.post('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(`Tạo thành công user: ${res.data.user.name}`);
      setName('');
      setEmail('');
      setAvatar(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Tạo User Mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Tên: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Avatar: </label>
          <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Tạo user'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateUserPage;
