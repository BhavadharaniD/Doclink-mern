import { Link } from "react-router-dom";
import {
  Calendar,
  MessageSquare,
  FileText,
  ChevronRight,
  Activity,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-900">
            DocLink
          </span>
        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#how" className="hover:text-blue-600">How it works</a>
          <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
        </div>

        <Link
          to="/login"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Sign In
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[-5%] w-[30%] h-[50%] bg-indigo-50/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-700 bg-blue-50 rounded-full">
            Trusted by thousands of users
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
            Modern Healthcare
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Starts with a Click
            </span>
          </h1>

          <p className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto">
            Book appointments, consult doctors online, receive prescriptions,
            and manage medical records — all in one platform.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="group flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Get Started
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/register"
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-2xl font-bold transition-all"
            >
              Explore Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Why choose DocLink?
            </h2>
            <p className="mt-4 text-slate-600">
              Everything you need for digital healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Feature
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              title="Find Doctors"
              desc="Search verified specialists and book appointments instantly."
            />
            <Feature
              icon={<MessageSquare className="w-6 h-6 text-indigo-600" />}
              title="Online Consultation"
              desc="Real-time chat consultations powered by WebSockets."
            />
            <Feature
              icon={<FileText className="w-6 h-6 text-emerald-600" />}
              title="Digital Records"
              desc="Prescriptions and medical history stored securely."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              How It Works
            </h2>
            <p className="mt-4 text-slate-600">
              Simple steps to better healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Step
              step="01"
              title="Register"
              desc="Sign up as a patient or doctor and access your dashboard."
            />
            <Step
              step="02"
              title="Book Appointment"
              desc="Choose a doctor and request a suitable time slot."
            />
            <Step
              step="03"
              title="Consult Online"
              desc="Chat live, get prescriptions, and complete consultation."
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              What Users Say
            </h2>
            <p className="mt-4 text-slate-600">
              Real experiences from our users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Testimonial
              name="Aarav Sharma"
              role="Patient"
              quote="Consulting a doctor from home was smooth and fast. Loved the UI!"
            />
            <Testimonial
              name="Dr. Meera Rao"
              role="Cardiologist"
              quote="The dashboard and real-time chat make online consultation easy."
            />
            <Testimonial
              name="Rohan Verma"
              role="Patient"
              quote="Appointments, prescriptions, records — everything in one place."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to start your consultation?
            </h2>
            <p className="mt-4 text-slate-400">
              Join DocLink today and experience digital healthcare.
            </p>
            <Link
              to="/register"
              className="inline-block mt-8 bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-10 text-center text-slate-500">
        © 2025 DocLink. Built with MERN Stack.
      </footer>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Feature({ icon, title, desc }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {title}
      </h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
}

function Step({ step, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
      <span className="text-blue-600 font-bold">{step}</span>
      <h3 className="mt-3 text-xl font-semibold text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
}

function Testimonial({ name, role, quote }) {
  return (
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
      <p className="italic text-slate-700">“{quote}”</p>
      <div className="mt-6">
        <p className="font-bold text-slate-900">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  );
}
