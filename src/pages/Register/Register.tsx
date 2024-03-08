import style from './Register.module.scss';
import image from '../../assets/icons/image_icon.png';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

export const Register = () => {
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!(e.target instanceof HTMLFormElement)) return;
    e.preventDefault();
    const displayName = (e.target[0] as HTMLInputElement | null)?.value;
    const email = (e.target[1] as HTMLInputElement | null)?.value;
    const password = (e.target[2] as HTMLInputElement | null)?.value;
    const file = (e.target[3] as HTMLInputElement | null)?.files![0];

    if (!displayName || !email || !password || !file) {
      alert('One of field are empty');
      return;
    }

    try {
      // Create the user account
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      // Upload the file
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (uploadError) => {
          console.error('Upload error:', uploadError);
          setError(true);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);

            // Update user profile and set user data
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            console.log('The data has been sent successfully');

            // Create empty user chats on Firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});

            // Navigation should only happen after all operations are complete
            //TODO: uncomment this after add navigate
            // navigate('/');
          } catch (firestoreError) {
            console.error('Firestore error:', firestoreError);
            setError(true);
          }
        }
      );
    } catch (authError) {
      console.error('Authentication error:', authError);
      setError(true);
    }
  };

  return (
    <div className={style.form_container}>
      <div className={style.form_wrapper}>
        <span className={style.logo}>Relex messenger</span>
        <span className={style.title}>Register</span>
        <form onSubmit={handleSubmit} className={style.form} action=''>
          <input type='text' placeholder='display name' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <input style={{ display: 'none' }} type='file' id='file' />
          <label htmlFor='file'>
            <img src={image} width='25px' alt='upload image icon' />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {error && <span>Error. Something went wrong</span>}
        </form>
        <p>Do you have an account? Login </p>
      </div>
    </div>
  );
};
