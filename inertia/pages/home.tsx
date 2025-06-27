// home.tsx
import { Head, Link } from '@inertiajs/react'
import { Headset, Mail } from 'lucide-react'
import Layout from '~/components/layout'

export default function Home() {
  return (
    <>
      <Head title="Portofilo" />

      <Layout>
        {/* Hero / About Section */}
        <section
          id="about"
          className="relative text-white py-24"
          style={{
            backgroundImage:
              'url(https://plus.unsplash.com/premium_photo-1682464651356-3c6780eff00c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Foto Profil */}
              <div className="md:col-span-1">
                <div className="w-44 h-44 rounded-full overflow-hidden shadow-lg border-4 border-indigo-500 mx-auto md:mx-0">
                  <img src="/user.png" alt="Profile" className="object-cover w-full h-full" />
                </div>
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2 space-y-5 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  Hi! Saya <span className="text-indigo-400">Arlenda Fitranto</span>
                </h1>
                <p className="text-lg leading-relaxed">
                  Seorang <strong>Backend dan Frontend (Fullstack) Developer</strong> yang antusias
                  membangun antarmuka yang modern dan ramah pengguna, serta backend yang cepat,
                  aman, dan scalable.
                </p>
                <p className="text-gray-300">
                  Berpengalaman lebih dari 4 tahun menggunakan React, Next, Laravel, Adonis, dan
                  Tailwind CSS. Fokus saya adalah membangun web app yang efisien & scalable.
                </p>
                <a
                  href="#contact"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
                >
                  <div className="flex gap-2">
                    <Headset /> Hubungi Saya
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-4 max-w-5xl mx-auto bg-gray-50">
          <div className="relative z-10 px-2 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">🛠️ Featured Projects</h2>

            <div className="grid md:grid-cols-4 gap-4">
              {/* Project Card 1 */}
              <div className="bg-white/50 text-gray-800 rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="GNAMS"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">Production Request Order</h3>
                  <p className="text-sm text-gray-900">
                    Web app modern menggunakan Next JS untuk aplikasi request perbaikan di
                    production line dan untuk request pembelian barang atau jasa. Dilengkapi dengan
                    Admin Dashboard untuk mengatur user dan section.
                  </p>
                </div>
              </div>

              {/* Project Card 2 */}

              <div className="bg-white/50 text-gray-800 rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl">
                <Link href="/trace">
                  <img
                    src="https://images.unsplash.com/photo-1717386255773-1e3037c81788?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Project 2"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-semibold">Traceability System</h3>
                    <p className="text-sm text-gray-900">
                      Traceability system dalam dunia manufacture. Menampilkan data yang yang
                      diambil dari mesin produksi. Data terintegrasi dangan vendor dan customer.
                      Menggunakan Laravel React dengan adapter Inertia JS.
                    </p>
                  </div>
                </Link>
              </div>

              {/* Project Card 3 */}
              <div className="bg-white/50 text-gray-800 rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1720879996903-24859d1df48f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Project 3"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">Production Preparation</h3>
                  <p className="text-sm text-gray-900">
                    Dari sentralisasi document yang digunakan untuk setup produksi, hingga
                    penyimpanan drawing equipment yang dinamis dengan perubahan. Dibuat dengan
                    Laravel React dengan style SPA menggunakan Sanctum.
                  </p>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="bg-white/50 text-gray-800 rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1683288662258-b02a355149e8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Project 3"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">Integrated Procurement System</h3>
                  <p className="text-sm text-gray-900">
                    Integrasi Purchasing, Ware House, Production, dan Engineering. Aplikasi
                    procurement yang terintegrasi dengan Equipment List dan document Engineering.
                    Dibuat dengan Adonis JS dan react dengan adapter Inertia JS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 px-4 max-w-5xl mx-auto bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">💡 Skills</h2>

          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold mb-2">Frontend</h3>
              <ul className="list-disc list-outside pl-5 space-y-1">
                <li>React JS & Next.js</li>
                <li>Tailwind CSS, Bootstrap</li>
                <li>HTML5, CSS3, JavaScript (ES6+)</li>
                <li>Vite</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Backend</h3>
              <ul className="list-disc list-outside pl-5 space-y-1">
                <li>Laravel, AdonisJS</li>
                <li>REST API, Authentication (JWT, Sanctum)</li>
                <li>PostgreSQL, MySQL</li>
                <li>Queue & Job Processing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Dev Tools & Deployment</h3>
              <ul className="list-disc list-outside pl-5 space-y-1">
                <li>Git, GitHub</li>
                <li>Docker, Nginx</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 px-4 max-w-5xl mx-auto bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            <span className="flex justify-center items-center gap-4">
              <Mail /> Contact Me
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Jika Anda tertarik untuk bekerja sama atau memiliki pertanyaan, jangan ragu untuk
            menghubungi saya melalui form di bawah ini atau melalui email langsung.
          </p>

          <form className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pesan</label>
              <textarea
                name="message"
                rows={5}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tulis pesan Anda..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
            >
              Kirim Pesan
            </button>
          </form>

          <div className="mt-10 text-center text-gray-600">
            Atau hubungi saya langsung di:{' '}
            <a href="mailto:arlenda.fitranto@gmail.com" className="text-indigo-600 underline">
              arlenda.fitranto@gmail.com
            </a>
          </div>
        </section>
      </Layout>
    </>
  )
}
