import { Container, ContainerSucces } from './styles'
import { useForm, ValidationError } from '@formspree/react'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import validator from 'validator'

export function Form() {
  const [state, handleSubmit] = useForm('xknkpqry') // Formspree form ID
  const [validEmail, setValidEmail] = useState(false)
  const [isHuman, setIsHuman] = useState(false)
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Email validation
  function verifyEmail(email1: string) {
    if (validator.isEmail(email1)) {
      setValidEmail(true)
      setEmail(email1) // Update email state only if valid
    } else {
      setValidEmail(false)
    }
  }

  // Handle Toast notifications
  useEffect(() => {
    if (state.succeeded) {
      toast.success('Email successfully sent!', {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: 'succeeded',
      })
    }
    if (state.errors.length > 0) {
      toast.error('Error submitting form! Please try again.', {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: 'failed',
      })
    }
  }, [state.succeeded, state.errors])

  // Handle the actual form submission to both Formspree and MongoDB
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Ensure all fields are valid before submitting
    if (!validEmail || !message || !name || !phone) {
      return toast.error('Please complete all fields and validate your email.', {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: 'missing-fields',
      })
    }

    // Prepare the form data for MongoDB
    const formData = {
      name,
      email,
      phone,
      message,
    }

    console.log(formData);

    try {
      // Send data to MongoDB API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
    
      // Check if response is OK (2xx status code)
      if (response.ok) {
        toast.success('Form data saved to database!', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        // If not OK, extract and display the error message from response
        const errorData = await response.json(); // assuming the server sends JSON response
        const errorMessage = errorData.error || 'Failed to save data to database!';
        
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    } catch (error) {
      // Handle network errors or any other unexpected issues
      const errorMessage = error instanceof Error ? error.message : 'Error sending data to server.';
      
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    
    // Submit to Formspree
    handleSubmit(e)
  }

  if (state.succeeded) {
    return (
      <ContainerSucces>
        <h3>Thanks for getting in touch!</h3>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Back to the top
        </button>
        <ToastContainer />
      </ContainerSucces>
    )
  }

  return (
    <Container>
      <h2>Get in touch using the form</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Name"
          id="name"
          type="text"
          name="name"
          value={name} // controlled input
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          value={email} // controlled input
          onChange={(e) => verifyEmail(e.target.value)} // validate email in real-time
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <input
          placeholder="Phone"
          id="phone"
          type="tel"
          name="phone"
          value={phone} // controlled input
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        
        <textarea
          required
          placeholder="Send a message to get started."
          id="message"
          name="message"
          value={message} // controlled input
          onChange={(e) => setMessage(e.target.value)}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button
          type="submit"
          disabled={state.submitting || !validEmail || !message || !name || !phone}
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </Container>
  )
}
