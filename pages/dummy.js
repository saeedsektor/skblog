import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
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

        <div className={styles.grid}>
          {posts.map(post => {
            return (
              <a key={post.id} href={`/posts/${post.slug}`} className={styles.card}>
                <img src={post.coverImage.url}/>
                <h3>{post.title} &rarr;</h3>
                <div className={styles.info}>
                  <small>{post.date}</small>
                  <small></small>
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
  const client = new ApolloClient({
    uri: 'https://api-ca-central-1.graphcms.com/v2/ckl4477p89ulr01ywfw91146d/master',
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
      query GetPosts {
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
      }
    `
  })

  console.log('data', data);

  return {
    props: {
      posts: data.posts
    }
  }
}