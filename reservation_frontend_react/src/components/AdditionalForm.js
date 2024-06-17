import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdditionalForm.css';

const AdditionalForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/additional', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      console.log('Additional created successfully:', response.data);
      navigate('/list-additionals');
    } catch (error) {
      console.error('Error creating additional:', error);
    }
  };

  return (
    <div className="space">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-group">
          <label>Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Enter name"
          />
          {errors.name && <span className="error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            {...register('price', { required: true, min: 0 })}
            type="number"
            placeholder="Enter price"
          />
          {errors.price && <span className="error">This field is required and must be non-negative</span>}
        </div>

        <div className="form-group">
          <label>Available</label>
          <input
            {...register('available')}
            type="checkbox"
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AdditionalForm;
