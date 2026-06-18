import PocketBase from 'pocketbase';

const pb = new PocketBase(
    import.meta.env.VITE_POCKETBASE_URL || 'https://unilag-energy-club-backend.up.railway.app'
);

export default pb;
