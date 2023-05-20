import {
  ParserDataFromApiGetArticleListToListTitleWithId,
  ParserDataFromApiGetTagListToListTitleWithId,
} from 'utils';
import { clientGetTagListQuery, clientGetArticlesListQuery } from 'gql';

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

function SiteMap () {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps ( {res} ) {

  // articles query && list
  const queryListArticles = await clientGetArticlesListQuery ( {pageSize: 50, page: 1, type: ['article', 'service']} );
  const listArticles = new ParserDataFromApiGetArticleListToListTitleWithId ().getData(queryListArticles.data);


  // tags query && list
  const queryListTags = await clientGetTagListQuery ( {page: 1, pageSize: 50} );
  const listTags = await new ParserDataFromApiGetTagListToListTitleWithId ( {
    pageSize: 50,
    getTagList: queryListTags.data,
  } ).getData ();



  let listSlugs = []
  listSlugs = [...listArticles.map((art) => art.slug), ...listTags.map((tag) => tag.slug)]

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

export default SiteMap;
