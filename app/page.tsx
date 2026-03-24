import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-50 min-h-screen font-sans">
      <div id="beranda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-24 md:py-28">
          <section className="space-y-6">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-widest">Toko Wiwin • Sejak 1995</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-900 leading-tight">
              Buka Peluang Bisnis Anda,
              <br />
              Mulailah dari Kami
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              Kami hadir dengan solusi praktis dan harga terjangkau, untuk menghemat tenaga, waktu, dan biaya dalam membuat website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-orange-500 text-white px-10 py-4 rounded-full shadow-lg hover:bg-orange-600 transition"
              >
                Lihat Katalog
              </Link>
              <a
                href="#kontak"
                className="inline-flex items-center justify-center border border-purple-600 text-purple-700 px-10 py-4 rounded-full hover:bg-purple-50 transition font-medium"
              >
                Hubungi Kami
              </a>
            </div>
          </section>

          <section id="katalog" className="relative">
            <div className="aspect-video rounded-3xl border-4 border-dashed border-purple-300 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-purple-500 font-semibold">Area gambar kosong (taruh di sini nanti)</span>
            </div>
          </section>
        </div>
      </div>

    </div>
  );
}

