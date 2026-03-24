import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-50 min-h-screen font-sans">
      <div id="beranda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 sm:py-16 md:py-24 lg:py-28">
          <section className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <p className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-widest">Sejak 1995</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple-900 leading-tight">
              Selamat Datang Di
              <br />
              Toko Wiwin 
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl">
              Temukan berbagai produk pilihan dengan kualitas terbaik. Nikmati pengalaman belanja yang mudah, aman, dan terpercaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-orange-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg hover:bg-orange-600 transition font-semibold text-sm sm:text-base"
              >
                Lihat Katalog
              </Link>
              <a
                href="#kontak"
                className="inline-flex items-center justify-center border-2 border-purple-600 text-purple-700 px-6 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-purple-50 transition font-semibold text-sm sm:text-base"
              >
                Hubungi Kami
              </a>
            </div>
          </section>

          <section id="katalog" className="relative order-1 lg:order-2">
            <div className="aspect-video rounded-2xl sm:rounded-3xl border-4 border-dashed border-purple-300 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-purple-500 font-semibold text-sm sm:text-base text-center px-4">Area gambar kosong (taruh di sini nanti)</span>
            </div>
          </section>
        </div>
      </div>

    </div>
  );
}

