import React,{useState,useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

function Form() {

// Keep track of users
const [users, setUsers] = useState([]);

// Set initial values
const [formState, setFormState] = useState({ name:"", useremail:"", enterpass:"", agree: false, })

// Set submit button as disabled 
const [buttonDisabled , setButtonDisabled] = useState(true) 

// Keep track of errors
const [errors, setErrors] = useState({ name:"", useremail:"", enterpass:"", agree: "", })

// Display info submitted to the server
const [post, setPost] = useState();


// Save data in the a state component
const changeFc = e =>{
    e.persist(); // pass event into validate function
    setFormState({...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value})
    setFormErrors(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value)

    console.log(formState)
    console.log('errors',errors)
}

// Build schema for validation with yup
const formSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    useremail: yup.string().email("Must be a valid email address."),
    enterpass: yup.string().required("Password is Required"),
    agree: yup.boolean().oneOf([true], "You must accept Terms and Conditions") 
})

// Build schema for errors
const setFormErrors = (name,value) =>{
    yup.reach(formSchema, name).validate(value)
    .then(valid => { setErrors({...errors, [name]: ""});
    })
    .catch(err => {
        console.log('errooorrsss', err.errors)
        setErrors({...errors, [name]: err.errors[0]});
    });
}

// Enable the submit button once the schema of the form is correct
// Whenever the form changes we check its format is correct
useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

// Handle the event of submission
const formSubmit = e => {
    e.preventDefault();  
    setUsers([...users,formState]);
  
    // send out POST request with obj as second param, for us that is formState.
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => {
        setPost(response.data);
        setFormState({ name:"", useremail:"", enterpass:"", agree: false, });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App">

          <p>Welcome! Complete this form to join us!</p>
          <form onSubmit={formSubmit}>
              <label> Username:   
                  <input type = 'text' data-cy ="name" name ="name" value ={formState.name} onChange={changeFc} />
                  {errors.name.length > 0 ? <p style ={{color:'red'}} className="error">{errors.name}</p> : null}
              </label>
              <br></br>
              <br></br>

              <label> Email:  
                  <input type = 'email'  data-cy ="useremail"  name ="useremail" value ={formState.useremail} onChange={changeFc} />
                  {errors.useremail.length > 0 ? <p style ={{color:'red'}}  className="error">{errors.useremail}</p> : null}
              </label>
              <br></br>
              <br></br>

              <label>Password:
                  <input type = 'password' data-cy ="enterpass" name ="enterpass" value ={formState.enterpass} onChange={changeFc}  />
                  {errors.enterpass.length > 0 ? <p style ={{color:'red'}}  className="error">{errors.enterpass}</p> : null}
              </label>
              <br></br>
              <br></br>

              <label> Terms of Service
                  <input type = 'checkbox'  data-cy ="agree"  name ="agree" checked={formState.agree} onChange={changeFc} />
                  {errors.agree.length > 0 ? <p style ={{color:'red'}}  className="error">{errors.agree}</p> : null}
              </label>
              <br></br>
              <br></br>

              <button   data-cy ="submit" disabled ={buttonDisabled} type ="submit"> Submit</button>
              <pre>{JSON.stringify(post,null,2)}</pre>
          </form>
          
    </div>
  );
}

export default Form;
