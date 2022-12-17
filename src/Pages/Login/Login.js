import React, { useEffect, useState } from "react";
import ItemService from "../../services/commonService";

const Login = () => {
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [headerName, setHeaderName] = useState();
  let [headerLogo, setHeaderLogo] = useState();
  let [info, setInfo] = useState();

  const getConfig = () => {
    ItemService.getConfig().then((items) => {
      setHeaderName(items.PRODUCT_NAME);
      setHeaderLogo(items.PRODUCT_LOGO);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let obj = {
      email: username,
      password: password,
    };
    ItemService.login(obj).then((items) => {
      if (items.status !== false) {
        window.location = "/home";
      } else {
        setInfo(items.message);
        document.getElementById("alertMsg").classList.add("show");
        setInterval(hideShowMsg, 3000);
        // setUsername('');
        // setPassword('');
      }
    });
  };

  function hideShowMsg() {
    document.getElementById("alertMsg").classList.remove("show");
    document.getElementById("alertMsg").classList.add("hide");
    localStorage.setItem("info", "");
  }

  useEffect(() => {
    console.log(">> Login Running");
    getConfig();
    const token = localStorage.getItem("token");
    const info = localStorage.getItem("info");

    if (token) {
      window.location = "/home";
    }

    if (info !== "") {
      setInfo(info);
      document.getElementById("alertMsg").classList.remove("hide");
      document.getElementById("alertMsg").classList.add("show");
      setTimeout(hideShowMsg, 3000);
    }
  }, []);

  return (
    <div>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src={headerLogo} alt="" />
                      <span className="d-none d-lg-block">{headerName}</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username & password to login
                        </p>
                      </div>

                      <form className="row g-3 needs-validation">
                        <div className="col-12 leftAl">
                          <label className="form-label">Username</label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              <i className="bi bi-person-square iconCol"></i>
                            </span>
                            <input
                              type="text"
                              name="username"
                              value={username || ""}
                              className="form-control"
                              id="username"
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-12 leftAl">
                          <label className="form-label">Password</label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              <i className="bi bi-shield-lock-fill iconCol"></i>
                            </span>
                            <input
                              type="password"
                              name="password"
                              value={password || ""}
                              className="form-control"
                              id="password"
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        {/* <div className="col-12">
                             <div className="form-check">
                                 <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                 <label className="form-check-label" for="rememberMe">Remember me</label>
                             </div>
                             </div> */}
                        <div className="col-12">
                          <br />
                          <button
                            className="btn btn-primary w-100"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12">
                          {/* <p className="small mb-0">
                            Don't have account?{" "}
                            <a href="create-account.html">Create an account</a>
                          </p> */}
                          <div
                            className="alert alert-warning alert-dismissible fade"
                            id="alertMsg"
                            role="alert"
                          >
                            <p>{info}</p>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                            ></button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="credits">
                    Designed by <a href="/login">Sansii</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
