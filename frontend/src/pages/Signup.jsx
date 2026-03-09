import { useForm } from 'react-hook-form';


function Signup() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    
    const submittedData = (data) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(submittedData)}>
                {/* 
                1) In react-hook-form, register() tells the form system: “Hey, track this input field and store its value under the name firstName.” 
                2) register function than return the object containing the properties like name,onChange,onBlur etc.
                3)The Spread Operator ... than spreads the object properties into JSX props.
                        name="firstName"    
                        onChange={...}
                        onBlur={...}
                        ref={...}
                4) Without spread : You would need to write like this
                        <input
                        name={register("firstName").name}
                        onChange={register("firstName").onChange}
                        onBlur={register("firstName").onBlur}
                        ref={register("firstName").ref}
                        />
                */}
                <input {...register('firstName')}
                placeholder='Enter Name' />
                
                <input {...register('email')} 
                placeholder='Enter Email'/>

                <input {...register('password')} 
                placeholder='Enter Password'/>

                <button type='submit' className='btn'>Submit</button>
            </form>
        </>
    )
}

export default Signup;