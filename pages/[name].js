import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const Name = () => {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      <Head>
        <title>{router.query.name}</title>
      </Head>
      <h1>Name Page!</h1>
      <p>Your name is: {router.query.name}</p>
      <Link href="/">
        <a>back to home</a>
      </Link>
    </div>
  );
};

export default Name;
