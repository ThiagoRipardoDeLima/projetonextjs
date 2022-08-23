import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Post } from "../../types/Post";

type Props = {
    post: Post
}

const Post = ({ post }: Props) => {
    return (
        <div>
            <h1>Blog</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
};

export default Post;

export const getStaticPaths = async () => {
    const res = await fetch('https:jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await res.json();

    const paths = posts.map( post => ({
        params: {
            id: post.id.toString()
        }
    }));

    return { paths, fallback: false }
}

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {

    const{ id } = context.params as IParams;

    const res = await fetch(`https:jsonplaceholder.typicode.com/posts/${id}`);
    const post = await res.json();

    return {
        props: {
            post
        }
    }
}
