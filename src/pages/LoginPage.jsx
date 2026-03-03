import { loginPageStatements } from "../data/loginpagedata";
import Statement from "../components/Statement";
import { StarIcon } from "@heroicons/react/16/solid";
import LoginForm from "../components/Forms/LoginForm";
import { MainLogo } from "../components/Utils/Icons";

function LoginPage() {
  return (
    <div className="gradient-bg min-h-screen overflow-x-hidden bg-slate-100 p-0 sm:p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      </div>
      <div className="absolute left-5 top-5 inline-flex items-center gap-3">
        <MainLogo />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1280px] items-center justify-center overflow-hidden rounded-3xl md:grid md:grid-cols-2">
        <section className="relative hidden  min-h-[680px] flex-col justify-between overflow-hidden  p-10 text-white md:flex xl:p-12">
          <div className="relative z-10">
            <h1 className="mt-10 max-w-md text-4xl font-semibold leading-tight xl:text-4xl">
              Expert level Cybersecurity in
              <span className="text-teal-300"> hours </span> not weeks.
            </h1>
            <p className="mt-8 text-lg font-semibold text-slate-200">
              What's included
            </p>
            <ul className="mt-4 space-y-4 text-slate-200">
              {loginPageStatements.map((statement) => (
                <Statement
                  key={statement.id}
                  text={statement.statement}
                  icon={"check"}
                />
              ))}
            </ul>
          </div>

          <div className="flex flex-col mb-10">
            <p className="flex mb-2">
              <StarIcon className="h-5 w-5 text-emerald-300" />
              <span className="text-md text-slate-200">Trustpilot</span>
            </p>
            <p className="relative text-lg text-slate-100">
              Rated 4.5/5.0
              <span className="ml-2 text-sm text-slate-400">
                (100k+ reviews)
              </span>
            </p>
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-2rem)] w-full items-center justify-center px-4 py-8 sm:px-6 md:min-h-[680px] md:px-8 xl:px-10 ">
          <LoginForm />
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
