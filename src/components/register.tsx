import { createUser } from "../actions/userActions";
import Button from "../components/button";

export default function Register() {
  return (
    <>
      <main>
        <article className="container1">
          <h1>Learn to code by watching others</h1>
          <p className="description">
            See how experienced developers solve problems in real-time. Watching
            scripted tutorials is great, but understanding how developers think
            is invaluable.
          </p>
        </article>
        <section className="container2">
          <div className="box2">
            <button className="btn-try">
              Try it free 7 days <span>then $20/mo. thereafter</span>
            </button>
            <div className="form-box">
              <form action={createUser}>
                <label htmlFor="firstName"></label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                />
                <p className="info nr1"></p>
                <label htmlFor="lastName"></label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  required
                />
                <p className="info nr2"></p>
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  required
                />
                <p className="info nr3"></p>
                <label htmlFor="password"></label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <p className="info nr4"></p>
                <Button
                  type="submit"
                  className="w-full h-auto mt-3 py-4 bg-btn-sumit-500 rounded-md"
                >
                  Claim your free trial
                </Button>
              </form>
              <p className="terms">
                By clicking the button, you are agreeing to our
                <a href="#">Terms and Services</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p className="attribution">
          Challenge by
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by
          <a href="https://github.com/mateusz-przybyla" target="_blank">
            Mateusz Przybyla
          </a>
          .
        </p>
      </footer>
    </>
  );
}
