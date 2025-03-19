import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import AppLayout from '@/components/layouts/AppLayout';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function App({ Component, pageProps }) {
  // Gunakan layout dari halaman, atau fallback ke AppLayout
  const getLayout = Component.getLayout || ((page) => <AppLayout title="My Tasks">{page}</AppLayout>);

  return <div className={poppins.className}>{getLayout(<Component {...pageProps} />)}</div>;
}
