import "./Feature.css";
import FeatureOne from "../../assets/fearure1.png";
import FeatureTwo from "../../assets/fearure2.png";
import FeatureThree from "../../assets/fearure3.png";
import featureBg1 from "../../assets/fearurebg1.png";
import featureBg2 from "../../assets/fearurebg2.png";
import featureBg3 from "../../assets/fearurebg3.png";

const Feature = () => {
  return (
    <section className="feature all_mb">
      <div className="container">
        <div className="featureTop">
          <div className="row mb_60 gy-3">
            <div className="">
              <h2 className="">
                Some features of <br className="d-lg-block d-none" />
                <span style={{ color: "#0095FF" }}>spohire</span>
              </h2>
            </div>  
            <div className="">
              <p>
                Spohire is a platform designed for the sports industry. With its
                simple and intuitive interface, athletes, coaches, and office
                staff can easily find new opportunities and new job within
                sports clubs or companies.
              </p>
            </div>
          </div>
        </div>

        <div className="featureBottom">
          <div className="row gy-3 justify-content-center">
            <div className="col-12 col-md-6 col-xl-4">
              <div
                className="featureBoxInner featureBg1  h-100"
                // style={{ background: `url(${featureBg1})` }}
              >
                <div className="row p-0 h-100 ">
                  <div className="col-lg-6 pt-lg-5 text-lg-start text-center ">
                    <h4 className="">Only in Sport</h4>
                    <p>
                      We are solely focused on the sports sector, dedicating all
                      our efforts and resources to serving its unique needs and
                      demands.
                    </p>
                  </div>

                  <div className="col-lg-6 feature_card2 p-0 text-lg-start text-center ">
                    <img className="d-lg-block d-none" src={FeatureOne} alt="img" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
              <div
                className="featureBoxInner featureBg2 h-100"
              >
                <div className="row p-0 h-100">
                  <div className="col-lg-6 text-lg-start text-center pt-lg-5">
                    <h4 className="">Diverse Offerings</h4>
                    <p>
                      Website aggregates announcements from various levels of
                      play, ranging from amateur leagues to professional teams.
                    </p>
                  </div>

                  <div className="col-lg-6 feature_card p-0">
                    <img className="d-lg-block d-none" src={FeatureTwo} alt="img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4 ">
              <div
                className="featureBoxInner featureBg3 h-100"
              >
                <div className="row p-0 h-100">
                  <div className="col-lg-6 text-lg-start text-center pt-lg-5">
                    <h4 className="">High anonymity </h4>
                    <p>
                      Various packages ensures that professional players can add
                      a profile through a recognizable athlete, allowing only
                      desired individuals to learn about the announcement.
                    </p>
                  </div>
                  <div className="col-lg-6 feature_card p-0">
                    <img className="d-lg-block d-none" src={FeatureThree} alt="img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
