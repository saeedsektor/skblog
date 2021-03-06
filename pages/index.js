import Head from 'next/head'
import Link from 'next/link'
import { GraphQLClient } from 'graphql-request';
import styles from '../styles/Home.module.css'

export default function Home({ posts, categories }) {
  console.log(posts);
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

        <nav>
          <ul className={styles.cats}>
            {categories.map(category => {
              return (
                <li>
                  <Link href={`/${category.slug}`}><a>- {category.name}</a></Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.grid}>
          {posts.map(post => {
            return (
              <a key={post.id} href={`/posts/${post.slug}`} className={styles.card}>
                <img src={post.coverImage.url}/>
                <h3>{post.title} &rarr;</h3>
                <div className={styles.info}>
                  <small>Created At : {
                        new Intl.DateTimeFormat('en-US',{
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                          }).format(Date.parse(post.date))
                  }</small>
                  <small>{post.author.name}</small>
                </div>
              </a>
            )
          })}
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

// fetch api
export async function getStaticProps() {
  const client = new GraphQLClient(
    'https://api-ca-central-1.graphcms.com/v2/ckl4477p89ulr01ywfw91146d/master'
  );

  const { posts } = await client.request(
    `{
      posts {
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
      }
    }`
  );

  const { categories } = await client.request(
    `{
      categories {
        id
        name
        slug
      }
    }`
  );



  return {
    props: {
      posts,
      categories
    }
  }
}