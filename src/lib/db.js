import { sql } from '@vercel/postgres';

//  send customer info to database
export async function submitShippingRequest(data) {
  try {
    console.log('Attempting database connection...');
    const result = await sql`
      INSERT INTO shipping_submissions 
      (name, phone_number, shipping_from, shipping_to, package_type, package_weight, estimated_price)
      VALUES 
      (${data.name}, ${data.phoneNumber}, ${data.shippingFrom}, ${data.shippingTo}, 
       ${data.packageType}, ${data.packageWeight}, ${data.estimatedPrice})
      RETURNING id;
    `;
    console.log('Database insert successful:', result);
    return result.rows[0].id;
  } catch (error) {
    console.error('Error submitting shipping request:', error);
    throw error;
  }
}

export async function submitEnquiry(data) {
  try {
    const result = await sql`
      INSERT INTO customer_enquiries 
      (name, phone_number, email, question)
      VALUES 
      (${data.name}, ${data.phoneNumber}, ${data.email}, ${data.question})
      RETURNING id;
    `;
    return result.rows[0].id;
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw error;
  }
}