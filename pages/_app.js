import { AuthProvider } from './../context/authContext';
import { ParamsProvider } from './../context/paramsContext';
import Head from 'next/head';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import dynamic from 'next/dynamic';
const TopBar = dynamic(() => import('../components/TopBar'), { ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <ParamsProvider>
      <AuthProvider>
        <Head>
          {/* Responsive meta tag */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* bootstrap CDN */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <TopBar />
        <Component {...pageProps} />
      </AuthProvider>
    </ParamsProvider>
  );
}

export default MyApp;
