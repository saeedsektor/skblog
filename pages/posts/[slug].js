import { GraphQLClient } from 'graphql-request';
import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/Home.module.css'


const graphcms = new GraphQLClient(
  'https://api-ca-central-1.graphcms.com/v2/ckl4477p89ulr01ywfw91146d/master'
);

export async function getStaticProps({ params }) {
  const { post } = await graphcms.request(
    `
    query PostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        coverImage{
            url
        }
        slug
        date
        author{
            name
        }
        content{
            text
        }
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(`
    {
      posts {
        slug
        title
      }
    }
  `);

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default function Single({ post }) {
    console.log(post);
    return (
      <div className={styles.container}>
        <Head>
          <title>Saeedev / Blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title}>
            Saeedev / Blog
          </h1>
  
          <p className={styles.description}>
            my thoughts and progress as a 
            <code className={styles.code}>fullstack developer</code>
          </p>
  
          <div className={styles.wrapper}>
                <Link href="/">
                    <a>↩  Go Back</a>
                </Link>
                <div className={styles.cardSingle}>
                  <img src={post.coverImage.url}/>
                  <h3>{post.title}</h3>
                  <div className={styles.info}>
                    
                    <small>Created At : {
                        new Intl.DateTimeFormat('en-US',{
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                          }).format(Date.parse(post.date))
                        }</small>
                    <small></small>
                    <small>Written By : {post.author.name}</small>
                  </div>
                  <hr/>
                  {post.content.text.toString()}
                </div>
          </div>
        </main>
  
        <footer className={styles.footer}>
          <a
            href="http://linkedin.com/in/saeed-k"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with Nextjs and GraphQL
          </a>
        </footer>
      </div>
    )
  }