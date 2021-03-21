import useUser from '../lib/useUser'
import Link from 'next/link';
import LinkMui from '@material-ui/core/Link';
import Layout from '../components/Layout';

export default function Home() {

  return (
    <Layout>
      <Link href="/login">
        <LinkMui variant="body2">
          Already have an account? Log in
        </LinkMui>
      </Link>
      <br></br>
      <Link href="/signUp">
        <LinkMui  variant="body2">
          {"Don't have an account? Sign Up"}
        </LinkMui>
      </Link>
    </Layout>
  );
}