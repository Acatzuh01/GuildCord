import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const { login } = useContext(AuthContext);

   const handleSubmit = async (e) => {
       e.preventDefault();
       setError('');
       setLoading(true);

       // Basic validation
       if (!email || !password) {
           setError('All fields are required!');
           setLoading(false);
           return;
       }
       if (!/\S+@\S+\.\S+/.test(email)) {
           setError('Email format is invalid!');
           setLoading(false);
           return;
       }
       if (password.length < 6) {
           setError('Password must be at least 6 characters long!');
           setLoading(false);
           return;
       }

       try {
           const response = await fetch('https://your-api-endpoint/login', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ email, password }),
           });

           if (!response.ok) {
               throw new Error('Login failed. Please check your credentials.');
           }

           const data = await response.json();
           login(data);
       } catch (error) {
           setError(error.message);
       } finally {
           setLoading(false);
       }
   };

   return (
       <div style={styles.container}>
           <div style={styles.formContainer}>
               <h1 style={styles.heading}>Login</h1>
               {error && <p style={styles.error}>{error}</p>}
               <form onSubmit={handleSubmit} style={styles.form}>
                   <div style={styles.formGroup}>
                       <label style={styles.label}>Email:</label>
                       <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           style={styles.input}
                       />
                   </div>
                   <div style={styles.formGroup}>
                       <label style={styles.label}>Password:</label>
                       <input
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                           style={styles.input}
                       />
                   </div>
                   <button type="submit" style={styles.button} disabled={loading}>
                       {loading ? 'Logging in...' : 'Login'}
                   </button>
               </form>
           </div>
       </div>
   );
};

// Inline styles
const styles = {
   container: {
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh',
       backgroundColor: '#f0f0f0',
   },
   formContainer: {
       width: '300px',
       textAlign: 'center',
   },
   heading: {
       marginBottom: '20px',
   },
   form: {
       display: 'flex',
       flexDirection: 'column',
   },
   formGroup: {
       marginBottom: '15px',
   },
   label: {
       marginBottom: '5px',
   },
   input: {
       padding: '10px',
       borderRadius: '5px',
       border: '1px solid #ccc',
   },
   button: {
       padding: '10px',
       borderRadius: '5px',
       border: 'none',
       backgroundColor: '#007bff',
       color: '#fff',
       cursor: 'pointer',
   },
   error: {
       color: 'red',
       marginBottom: '10px',
   },
};

export default Login;