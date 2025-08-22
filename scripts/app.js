
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs, doc, getDoc, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const waitForConfig = () => new Promise(res => {
  const chk = () => window.FB_CONFIG ? res() : setTimeout(chk, 50);
  chk();
});
await waitForConfig();

const app = initializeApp(window.FB_CONFIG);
const db = getFirestore(app);

// Helpers
export async function listByCategory(cat){
  const q = query(collection(db,'events'), where('category','==',cat), orderBy('date','asc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({id:d.id, ...d.data()}));
}
export async function getEvent(slug){
  const ref = doc(db,'events', slug);
  const s = await getDoc(ref);
  if(!s.exists()) return null;
  return {id:s.id, ...s.data()};
}
