import { useForm, FormProvider } from 'react-hook-form'; //NestedInput

const AddressForm = () => {
    // const [shipppingCountries, setShippingCountries ] = useState([]);
    // const [] = useState([]);
    // const [] = useState([]);
    // const [] = useState([]);
    // const [] = useState([]);
    // const [] = useState([]);
    const methods = useForm();
    const onSubmit = () => { 
        return console.log('On Submit');
    }
    return (
        <>
            <h1>Address</h1>
            <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {/* <NestedInput /> */}
                    <input type="submit" />
                </form>
            </FormProvider>
        </>
    )
}
export default AddressForm;