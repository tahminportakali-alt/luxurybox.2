// 1. SUPABASE PROJE AYARLARI VE BAĞLANTISI
const SUPABASE_URL = 'https://jjszczuxzmviluoqubloo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aWvCMroovjTksIx4mk3owA_vqCFKvJl';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. VERİTABANI FONKSİYONLARI (Senin Orijinal Kodların)
async function getProducts() {
    const { data, error } = await supabaseClient.from('urunler').select('*').order('id', { ascending: false });
    if (error) { console.error('❌ Ürünler alınamadı:', error); return []; }
    return data;
}

async function getProductsByCategory(kategori) {
    const { data, error } = await supabaseClient.from('urunler').select('*').eq('kategori', kategori).order('id', { ascending: false });
    if (error) { console.error('❌ Kategori ürünleri alınamadı:', error); return []; }
    return data;
}

async function addProduct(product) {
    const { data, error } = await supabaseClient.from('urunler').insert([{ isim: product.isim, marka: product.marka || '', fiyat: product.fiyat, resim: product.resim, kategori: product.kategori }]).select();
    if (error) { console.error('❌ Ürün eklenemedi:', error); return null; }
    return data[0];
}

async function deleteProduct(id) {
    const { error } = await supabaseClient.from('urunler').delete().eq('id', id);
    if (error) { console.error('❌ Ürün silinemedi:', error); return false; }
    return true;
}

console.log('✅ Supabase bağlantısı hazır!');

// 3. ⚠️ DİĞER DOSYALARIN ERİŞEBİLMESİ İÇİN EKLEME
window.db = {
    getProducts,
    getProductsByCategory,
    addProduct,
    deleteProduct
};
