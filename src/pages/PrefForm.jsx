import '../styles/PrefForm.css';
import Question from '../components/Question.jsx';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useDbUpdate, useStorageUpload } from '../utilities/firebase';

const PrefForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: '',
    major: '',
    number: '',
    desc: '',
    gender: '',
    roommateGender: [],
    location: '',
    size: [],
    wakeUpTime: '',
    bedTime: '',
    guests: '',
    clean: '',
    noise: '',
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});

  const requiredFields = [
    'fullName', 'major', 'number', 'desc', 'gender',
    'roommateGender', 'location', 'size', 'wakeUpTime',
    'bedTime', 'guests', 'clean', 'noise', 'profilePhoto'
  ];

  const validateForm = () => {
    const newErrors = {};

    // Check for empty required fields
    requiredFields.forEach((field) => {
      if (
        data[field] === '' ||
        data[field] === null ||
        (Array.isArray(data[field]) && data[field].length === 0)
      ) {
        newErrors[field] = 'This field is required';
      }
    });

    // Validate phone numbers are only numbers
    const phoneNumberRegex = /^[0-9]+$/;
    if (!phoneNumberRegex.test(data.number)) {
      newErrors.number = 'Phone number must contain only numbers';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const isComplete = requiredFields.every((field) => {
    const value = data[field];
    return (
      value !== '' &&
      value !== null &&
      (!Array.isArray(value) || value.length > 0)
    );
  });

  const [update, result] = useDbUpdate(`/roommateInfo/${data.fullName}`);
  const [upload, uploading, fileURL, error] = useStorageUpload(`/profilePhotos/${data.fullName}`);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    const isCheckBox = name === 'roommateGender' || name === 'size';
    const isProfilePhoto = name === 'profilePhoto';

    if (isProfilePhoto) {
      const file = files[0];
      setData((prevData) => ({ ...prevData, profilePhoto: file }));
    } else if (isCheckBox) {
      setData((prevData) => {
        const newAnsArr = prevData[name].includes(value)
          ? prevData[name].filter((ans) => value !== ans)
          : [...prevData[name], value];

        return { ...prevData, [name]: newAnsArr };
      });
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // DEMO ONLY fields
  const demoAutoFill = () => {
    setData({
      fullName: 'Chris Riesbeck',
      major: 'Computer Science',
      number: '1234567890',
      desc: "I'm an agile type of guy",
      gender: 'Male',
      roommateGender: ['Any'],
      location: 'North',
      size: ['Double', 'Triple', 'Suite'],
      wakeUpTime: '6-8 AM',
      bedTime: 'Early',
      guests: 'No',
      clean: 'Clean',
      noise: 'Quiet',
      profilePhoto: null, // Optionally add a default file here if needed
    });
  };

  const submit = async (evt) => {
    evt.preventDefault();

    if (!validateForm()) {
      alert('Please fill out all fields correctly.');
      return;
    }

    let photoURL = '';
    if (data.profilePhoto) {
      try {
        const uploadedPhoto = await upload(data.profilePhoto);
        console.log('Uploaded Photo:', uploadedPhoto);
        if (uploadedPhoto && uploadedPhoto.url) {
          photoURL = uploadedPhoto.url;
        } else {
          console.error('File upload failed');
          if (error) {
            console.error('Error during upload:', error);
          }
          return; // Exit the function if upload fails
        }
      } catch (uploadError) {
        console.error('Upload exception:', uploadError);
        return;
      }
    }

    const submitData = {
      ...data,
      profilePhoto: photoURL
    };

    if (data.size.length === 1) {
      submitData.size = { 0: data.size[0] };
    }
    if (data.roommateGender.length === 1) {
      submitData.roommateGender = { 0: data.roommateGender[0] };
    }

    await update(submitData);
    console.log('added');
    navigate('/matches');
  };

  return (
    <form onSubmit={submit}>
      <div className="personal-info">
        <h1>Personal Information</h1>
        <input
          className="border rounded border-white"
          type="text"
          placeholder=" Full Name"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
        />
        <input
          className="border rounded border-white"
          type="text"
          placeholder=" Major"
          name="major"
          value={data.major}
          onChange={handleChange}
        />
        <input
          className="border rounded border-white"
          type="text"
          placeholder=" Phone Number"
          name="number"
          value={data.number}
          onChange={handleChange}
        />
        <textarea
          className="border rounded border-white"
          placeholder=" Description"
          name="desc"
          value={data.desc}
          onChange={handleChange}
        />
        <input
          className="border rounded border-white"
          type="file"
          name="profilePhoto"
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      <Question
        label="Your Gender"
        name="gender"
        answers={['Male', 'Female', 'Non-binary', 'Other']}
        data={data}
        handleChange={handleChange}
        type="radio"
      />

      <Question
        label="Roommate Gender"
        name="roommateGender"
        answers={['Male', 'Female', 'Non-binary', 'Any']}
        data={data}
        handleChange={handleChange}
        type="checkbox"
      />

      <Question
        label="Location"
        name="location"
        answers={['North', 'South']}
        data={data}
        handleChange={handleChange}
        type="radio"
      />

      <Question
        label="Size"
        name="size"
        answers={['Double', 'Triple', 'Suite']}
        data={data}
        handleChange={handleChange}
        type="checkbox"
      />

      <Question
        label="Wake Up Time"
        name="wakeUpTime"
        answers={['6-8 AM', '8-10 AM', '10AM-12PM']}
        data={data}
        handleChange={handleChange}
        type="radio"
      />

      <Question
        label="Bedtime"
        name="bedTime"
        answers={['Early', 'Late']}
        data={data}
        handleChange={handleChange}
        type="radio"
      />

      <Question
        label="Guests"
        name="guests"
        answers={['Yes', 'No']}
        data={data}
        handleChange={handleChange}
        type="radio"
      />

      <Question
        label="Cleanliness"
        name="clean"
        answers={['Messy', 'Clean']}
        data={data}
        handleChange={handleChange}
        type="radio"
      />

      <Question
        label="Noise Level Preference"
        name="noise"
        answers={['Quiet', 'Occasional', 'Fine with noises']}
        data={data}
        handleChange={handleChange}
        type="radio"
      />

      <button type="submit" className={isComplete ? '' : 'disabled-button'}>Submit</button>
      <button type="button" onClick={demoAutoFill} className="demo-button">(DEMO ONLY)</button>
    </form>
  );
};

export default PrefForm;
