import { useRouter } from "next/router";

const Sobre = () => {

    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            <h1>Pagina de {slug}</h1>

            <p>Pathname: {router.pathname}</p>

            <p>isFallback: {router.isFallback.toString()}</p>

            <button onClick={()=>{
                router.push('/sobre/pedro')
            }}>Ir para pagina de pedro</button>
        </div>
    );
};


export default Sobre;