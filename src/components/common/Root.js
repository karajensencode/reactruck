import Header from '../layout/Header';

export default function Root({ transparentHeader, children }) {
  return (
    <>
      <Header transparent={transparentHeader} />
      {children}
    </>
  );
}