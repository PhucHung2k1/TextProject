import Head from 'next/head';

export interface IMetaSEOProps {
  title?: string;
  defaultMeta?: {
    name?: {
      applicationName?: string;
      author?: string;
      description?: string;
      generator?: string;
      keywords?: string;
      viewport?: string;
    };
    httpEquiv?: {
      contentSecurityPolicy?: string;
      contentSype?: string;
      defaultStyle?: string;
      refresh?: string;
    };
    charset?: string;
  };
}

const MetaSEO = ({ title, defaultMeta }: IMetaSEOProps) => {
  return (
    <Head>
      <title>{title ?? 'MANGO APP'}</title>

      {!defaultMeta?.name?.description ? undefined : (
        <meta name="description" content={defaultMeta.name.description} />
      )}
    </Head>
  );
};
export default MetaSEO;
