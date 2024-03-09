/* import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom"; */
import "../css/slick.css";
import "../css/aos.css";
import "../css/venobox.min.css";
import "../css/style.css";
import "../css/responsive.css";
import "../assets/font-awesome/6.4.2/css/all.min.css";
export default function Footr() {
  return (
    <div>
      {/* <Footer className="bg-gray-800 text-white p-1 mt-4">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="mb-8"><Link to="/Home">ABOULJID</Link></div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <ul>
                <li>
                  <Link to="/Home">Home</Link>
                </li>
                <li>
                  <Link to="#">Contact</Link>
                </li>

                <li>
                  <Link to="#">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Follow us</h2>
              <ul>
                <li>
                  <Link to="#">Github</Link>
                </li>
                <li>
                  <Link to="#">Discord</Link>
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Legal</h2>
              <ul>
                <li>
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-gray-00" />
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; ABOULJID™ 2024</p>
            <div className="flex space-x-4">
              <Link to="#" className="text-white">
                <BsFacebook />
              </Link>
              <Link to="#" className="text-white">
                <BsInstagram />
              </Link>
              <Link to="#" className="text-white">
                <BsTwitter />
              </Link>
              <Link to="#" className="text-white">
                <BsGithub />
              </Link>
            </div>
          </div>
        </div>
      </Footer> */}


<footer className="footer ">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-12" data-aosNameclassName="fade-right">
                    <div className="footer-logo">
                        <div className="logo">
                         <p className="text-white footer-text">ABOULJID</p>
{/*                             <img src="https://quomodosoft.com/html/reservq//imgs/logo/footer-logo.svg" alt="logo"/>
 */}                        </div>
                    </div>
                    <div className="footer-text">
                        <h4>At ReservQ, we invite you to embark on a journey of taste and delight.Our tables are more than just places.</h4>
                    </div>
                    <div className="footer-icon">
                        <div className="icon">
                            <a href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://twitter.com/" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                            <a href="https://www.instagram.com/" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://www.youtube.com/" target="_blank"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 mol-md-12 ">
                    <div className="row flex justify-between gap-11 items-center">
                        <div className="col-lg-3 col-md-3" data-aosNameclassName="fade-right" data-aos-delay="100">
                            <div className="quick-line-item">
                                <div className="quick-line-item-head">
                                    <h3>Quick Link</h3>
                                </div>
                                <div className="quick-line-menu">
                                    <ul>
                                        <li>
                                            <a href="dashboard.html">My Account</a>
                                        </li>
                                        <li>
                                            <a href="about.html">About Us</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Store Locator</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Delivery</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Pickup</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3" data-aosNameclassName="fade-right" data-aos-delay="200">
                            <div className="quick-line-item">
                                <div className="quick-line-item-head">
                                    <h3>Terms & Privacy</h3>
                                </div>
                                <div className="quick-line-menu">
                                    <ul>
                                        <li>
                                            <a href="trust-safety.html">Trust & Safety</a>
                                        </li>
                                        <li>
                                            <a href="terms-service.html">Terms of Service</a>
                                        </li>
                                        <li>
                                            <a href="privacy-policy.html">Privacy Policy</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6" data-aosNameclassName="fade-right" data-aos-delay="300">
                            <div className="quick-line-item">
                                <div className="quick-line-item-head">
                                    <h3>Subscribe our Newsletter</h3>
                                </div>
                                <div className="quick-line-btn">
                                    <div className="icon">
                                        <img src="/imgs/icon/sms.png" alt="icon"/>
                                    </div>
                                    <input type="email" className="form-control" id="exampleFormControlInput6" placeholder="Your email"/>
                                    <a href="#" className="main-btn-four">Subscribe</a>
                                </div>
                                <div className="quick-line-btn-text">
                                    <h6>We accept Payment methods:</h6>
                                </div>
                                <div className="quick-line-btn-img">
                                    <a href="#">
<img src="./imgs/small/Visa.png" alt="img"/>
</a>
                                    <a href="#">
<img src="./imgs/small/Amex.png" alt="img"/>
</a>
                                    <a href="#">
<img src="./imgs/small/PayPal.png" alt="img"/>
</a>
                                    <a href="#">
<img src="./imgs/small/Mastercard.png" alt="img"/>
</a>
                                    <a href="#">
<img src="./imgs/small/GooglePay.png" alt="img"/>
</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="copyright">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="copyright-text">
                        <h4>©2023 <span>ReservQ</span>. All rights By <a href="http://www.ABOULJID.com">ABOULJID</a></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </footer>

    </div>
  );
}
