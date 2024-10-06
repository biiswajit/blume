export function LoginTitle() {
  return (
    <div className="flex flex-col gap-5 font-display text-center bg-white-0 px-5 sm:px-14 py-5 ring-1 ring-white-100 rounded-t-xl">
      <h2 className="text-2xl sm:text-3xl font-bold">Login to your account</h2>
      <p className="text-lg sm:text-xl">
        Welcome back!
        <br /> {`We're happy to have you with us`}
      </p>
    </div>
  );
}
