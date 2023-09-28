import {
  connectQueries,
  ParseArticlesToTitleIdSlug,
  ParserDataFromApiGetTagListToListTitleWithId,
} from 'utils';
import { clientGetTagListQuery, clientGetArticlesQuery } from 'gql';


const EXTERNAL_DATA_URL = 'https://wtrasie.pl';

function generateSiteMap ( listSlugs: Array<string> ): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
       <url>
           <loc>${`${EXTERNAL_DATA_URL}`}</loc>
       </url>
      <url>
           <loc>${`${EXTERNAL_DATA_URL}/s`}</loc>
       </url>
     ${listSlugs
    .map ( ( slug ) => {
      return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${slug}`}</loc>
       </url>
     `;
    } )
    .join ( '' )}
   </urlset>
 `;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}


export async function getServerSideProps ({res}) {

  const queryListArticles = await clientGetArticlesQuery( { pageSize: 25, page: 1, type: ['article', 'service'] } );
  const dataListArticles = await connectQueries ( {
    functionQuery: clientGetArticlesQuery,
    variablesQuery: { pageSize: 25, type: ['article', 'service'] },
    pageCount: queryListArticles?.data?.articles?.meta?.pagination?.pageCount || 1
  } )


  // eslint-disable-next-line prefer-spread
  const listArticles = [].concat.apply ( [], dataListArticles.map ( pageWithArts => {
    return new ParseArticlesToTitleIdSlug ().getData ( pageWithArts )
  }))


  // tags query && list
  const queryListTags = await clientGetTagListQuery ( { pageSize: 25, page: 1 } );
  const dataListTags = await connectQueries( {
    functionQuery: clientGetTagListQuery,
    variablesQuery: { pageSize: 25 },
    pageCount: queryListTags?.data?.tags?.meta?.pagination?.pageCount || 1
  })

  // eslint-disable-next-line prefer-spread
  const listTags = [].concat.apply ( [], dataListTags.map ( pageWithTags => {
    return new ParserDataFromApiGetTagListToListTitleWithId ().getData(pageWithTags)
  }));


  const articleSlugs = listArticles.map((art) => art.slug).filter(Boolean);
  const tagSlugs = listTags.map((tag) => tag.slug).filter(Boolean);
  const listSlugs = [...articleSlugs, ...tagSlugs];


  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap ( listSlugs );

  res.setHeader ( 'Content-Type', 'text/xml' );
  // we send the XML to the browser
  res.write ( sitemap );
  res.end ();

  return {
    props: {},
  };
}
