import Head from "next/head";
import Script from "next/script";
import { Todo } from "../types/Todo";

type Props = {
    todoList: Todo[];
}

const Todo = ({ todoList }: Props) => {
    return (
        <div>
            <Head>
                <title>Lista de Tarefa</title>
            </Head>
            <h1>Lista de Tarefas</h1>
            <ul>
                {todoList.map((todo, index)=>(
                    <li key={index}>{todo.title}</li>
                ))}
            </ul>

            {/* <Script strategy="beforeInteractive">
                {`window.alert('tudo certo!')`}
            </Script> */}

        </div>
    );
};

export default Todo;

export const getServerSideProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todoList:Todo[] = await res.json();
    return {
        props: {
            todoList
        }
    }

}