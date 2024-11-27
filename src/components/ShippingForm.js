'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitShippingRequest } from '@/lib/db';

export default function ShippingForm() {
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const calculatePrice = (packageType, weight) => {
    if (packageType === 'laptop') return 50;
    if (packageType === 'phone') return 30;
    return weight * 12;
  };

  const onSubmit = async (data) => {
    const price = calculatePrice(data.packageType, parseFloat(data.packageWeight));
    
    try {
      const submitData = {
        ...data,
        estimatedPrice: price
      };
      
      const result = await submitShippingRequest(submitData);
      alert(`Shipping request submitted! Tracking ID: ${result}`);
    } catch (error) {
      alert('Failed to submit shipping request');
    }
  };

  const handlePriceCalculation = () => {
    const weight = document.getElementById('packageWeight').value;
    const packageType = document.getElementById('packageType').value;
    const price = calculatePrice(packageType, parseFloat(weight));
    setEstimatedPrice(price);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Ship a Package</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input 
            {...register('name', { required: 'Name is required' })}
            className="form-input"
            placeholder="Your Name"
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input 
            {...register('phoneNumber', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit phone number'
              }
            })}
            className="form-input"
            placeholder="1234567890"
          />
          {errors.phoneNumber && <p className="form-error">{errors.phoneNumber.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Shipping From</label>
          <input 
            {...register('shippingFrom', { required: 'Shipping origin is required' })}
            className="form-input"
            placeholder="City, State"
          />
          {errors.shippingFrom && <p className="form-error">{errors.shippingFrom.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Shipping To</label>
          <select 
            {...register('shippingToCountry')}
            className="form-select"
          >
            <option value="">Select Country (Option)</option>
            <option value="Gambia">Gambia</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            {/* Add more countries as needed */}
          </select>
          {errors.shippingTo && <p className="form-error">{errors.shippingTo.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Package Type</label>
          <select 
            {...register('packageType', { required: 'Package type is required' })}
            id="packageType"
            className="form-select"
            onChange={handlePriceCalculation}
          >
            <option value="">Select Package Type</option>
            <option value="laptop">Laptop ($50)</option>
            <option value="phone">iPhone ($30)</option>
            <option value="phone">Android ($30)</option>
            <option value="other">Other Package</option>
          </select>
          {errors.packageType && <p className="form-error">{errors.packageType.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Package Weight (lbs)</label>
          <input 
            type="number"
            id="packageWeight"
            {...register('packageWeight', { 
              required: 'Package weight is required',
              min: { value: 0.1, message: 'Weight must be greater than 0' }
            })}
            className="form-input"
            placeholder="Enter package weight"
            onChange={handlePriceCalculation}
          />
          {errors.packageWeight && <p className="form-error">{errors.packageWeight.message}</p>}
        </div>

        {estimatedPrice !== null && (
          <div className="form-group" style={{textAlign: 'center', fontWeight: 'bold'}}>
            Estimated Price: ${estimatedPrice.toFixed(2)}
          </div>
        )}

        <button 
          type="submit" 
          className="btn"
        >
          Submit Shipping Request
        </button>
      </form>
    </div>
  );
}