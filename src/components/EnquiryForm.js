'use client';

import { useForm } from 'react-hook-form';
import { submitEnquiry } from '@/lib/db';

export default function EnquiryForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await submitEnquiry(data);
      alert('Enquiry submitted successfully!');
      reset();
    } catch (error) {
      alert('Failed to submit enquiry');
    }
  };

  return (
    <div className="form-container">
      
      <h2 className="form-title">Customer Enquiry</h2>

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
                value: /^[0-9]{7}$/,
                message: 'Please enter a valid phone number'
              }
            })}
            className="form-input"
            placeholder="123456789"
          />
          {errors.phoneNumber && <p className="form-error">{errors.phoneNumber.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Email (Optional)</label>
          <input 
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="form-input"
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Your Question</label>
          <textarea 
            {...register('question', { required: 'Please enter your question' })}
            className="form-textarea"
            rows="4"
            placeholder="Ask your question here..."
          />
          {errors.question && <p className="form-error">{errors.question.message}</p>}
        </div>

        <button 
          type="submit" 
          className="btn"
        >
          Submit Enquiry
        </button>
      </form>

<br></br>
      
      <div className="form-group">
        <h3 class="header-faq" >Frequently Asked Questions</h3>
        <ul className="faq-list">
          <li class="li-bold">What areas do we serve?</li>
          <p>We ship between Gambia and USA</p>
          <li class="li-bold">How long does shipping take?</li>
          <p>Shipping normal take 2 to 3 days to reach destionation</p>
          <li class="li-bold">What are our packaging requirements?</li>
          <p>We send almost all types all packages, but we do have some restricted item we dont accept. Please call us more more details</p>
          <li class="li-bold">How do we handle fragile items?</li>
          <p>All package are handle with care. Be sure that your package will gwt to its destination safely</p>
        </ul>
      </div>

    </div>
  );
}