import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: gọi API quên mật khẩu ở đây, ví dụ: await authApi.forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err?.message || 'Không gửi được email, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[400px] px-5 py-12 sm:py-16">
      <h1 className="text-2xl font-bold uppercase tracking-wide text-stone-900">Quên mật khẩu</h1>
      <span className="mt-3 block h-px w-6 bg-stone-400" />

      {sent ? (
        <p className="mt-6 border border-stone-200 bg-stone-50 p-5 text-sm leading-6 text-stone-700">
          Nếu <strong className="text-stone-900">{email}</strong> đã được đăng ký, bạn sẽ nhận được email hướng dẫn
          đặt lại mật khẩu trong ít phút.
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm text-stone-600">
            Nhập email đã đăng ký. Chúng tôi sẽ gửi liên kết để bạn đặt lại mật khẩu.
          </p>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            {error && <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <div className="grid gap-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-stone-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="ten@email.com"
                className="h-11 w-full border border-stone-300 bg-white px-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-2 focus:outline-stone-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-black text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-stone-800 disabled:opacity-60"
            >
              {loading ? 'Đang xử lý...' : 'Gửi liên kết đặt lại'}
            </button>
          </form>
        </>
      )}

      <p className="mt-8 text-center text-sm text-stone-600">
        <Link to="/login" className="inline-flex items-center gap-1.5 font-semibold text-stone-900 hover:text-orange-700">
          <ArrowLeft className="size-4" />
          Quay lại đăng nhập
        </Link>
      </p>
    </div>
  );
}