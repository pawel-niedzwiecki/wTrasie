import { Header } from '../uxu-utils';
import { Headphones, Home, Tool } from 'react-feather';
import { useHookSearch } from 'hooks';

export const Layout = ({ children }: any) => {
  const { setQuery, res } = useHookSearch();

  return (
    <>
      <Header
        res={res}
        tabs={[
          { title: 'Home', value: '/', icon: <Home />, active: true },
          { title: 'Usługi', value: '/uslugi', icon: <Tool />, active: false },
          { title: 'Kontakt', value: '/kontakt', icon: <Headphones />, active: false },
        ]}
        callBack={(search: string) => {
          setQuery(search);
        }}
      />
      {children}
    </>
  );
};
