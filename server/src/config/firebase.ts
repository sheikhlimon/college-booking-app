import admin from 'firebase-admin';

const isConfigured =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

// Only initialize when credentials are available so the server can still start
// without them (protected routes will return 401 until configured)
if (!admin.apps.length && isConfigured) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
} else if (!isConfigured) {
  console.warn(
    'Firebase Admin not configured — set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY to enable auth'
  );
}

export default admin;
export const isFirebaseInitialized = () => admin.apps.length > 0;
