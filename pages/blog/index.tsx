import Head from "next/head";
import { Post } from "../../types/Post";

type Props = {
    name: string;
    posts: Post[];
}

const Blog = ({ name, posts }: Props) => {
    return (
        <div>
            <Head>
                <title>Blog</title>
            </Head>
            <h1>Blog</h1>
            <p>Autor: {name}</p>
            <br />
            
            <ul>
                {posts.map((post, index)=>(
                    <li key={index}> <a href={`/blog/${post.id}`}>{post.title}</a></li>
                ))}
            </ul>            
        </div>
    );
}


export const getStaticProps = async () => {

    const res = await fetch('https:jsonplaceholder.typicode.com/posts');

    const posts: Post[] = await res.json();

    return {
        props: {
            name: 'Thiago',
            posts
        },
        revalidate:7200
    }
}

export default Blog;

