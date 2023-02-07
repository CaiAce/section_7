import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Notification from '../components/ui/notification';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Notification title="Test" message="This is a test!" status="Error" />
    </Layout>
  );
}

export default MyApp;
