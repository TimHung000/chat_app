import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const Back = () => navigate(-1);

    return (
        <section>
            <h1> Unauthorized </h1>
            <br/>
            <p> You don't have access to the requested page</p>
            <button onClick={Back}>Go Back</button>
        </section>
    )
}

export default Unauthorized;