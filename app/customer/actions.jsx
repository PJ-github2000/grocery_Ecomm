// 'use server' directive is placed within the function
'use server'

import { getMongoDb } from '../../lib/mangodb-data';

export async function submitForm(formData) {
  const db = await getMongoDb();
  const submissionsCollection = db.collection('submissions');

  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  try {
    await submissionsCollection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    const count = await submissionsCollection.countDocuments();

    return { success: true, count };
  } catch (error) {
    console.error('Submission error:', error);
    return { success: false, error: 'Failed to submit form' };
  }
}
