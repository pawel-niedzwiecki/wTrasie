import { Layout } from 'layout';


export async function getServerSideProps(context) {
  return {
    props: { ok: 'ok' }, // will be passed to the page component as props
  };
}


type Props = {
  ok: string
}

export default function Search({ ok }: Props) {
  console.log(ok);

  return (
    <Layout>
      Search
    </Layout>
  );
}


