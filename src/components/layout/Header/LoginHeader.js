
const LoginHeader = ({
    heading = "Create an account",
    paragraph="Already have an account? ",
    linkName="Login",
    linkUrl = "/login"
}) => {

    return (
        <header className="bg-white">
            <h1>{heading}</h1>
            <p>{paragraph}</p>
            <p><a href={{linkUrl}}>{linkName}</a></p>
        </header>
    );
}

export default LoginHeader;