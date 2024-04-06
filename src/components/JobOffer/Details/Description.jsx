import React from "react";
import Mendatory from "./Mendatory";

const Description = () => {
  return (
    <div className="description_outline">
      <Mendatory />
      <div className="description">
        <h5>Description of requirements</h5>
        <p>
          Velstar is a Shopify Plus agency, and we partner with brands to help
          them grow, we also do the same with our people!
        </p>
        <p>
          {" "}
          Here at Velstar, we don't just make websites, we create exceptional
          digital experiences that consumers love. Our team of designers,
          developers, strategists, and creators work together to push brands to
          the next level. From Platform Migration, User Experience & User
          Interface Design, to Digital Marketing, we have a proven track record
          in delivering outstanding eCommerce solutions and driving sales for
          our clients.
        </p>{" "}
        <br />
        <p>
          {" "}
          The role will involve translating project specifications into clean,
          test-driven, easily maintainable code. You will work with the Project
          and Development teams as well as with the Technical Director, adhering
          closely to project plans and delivering work that meets functional &
          non-functional requirements. You will have the opportunity to create
          new, innovative, secure and scalable features for our clients on the
          Shopify Platform
        </p>{" "}
        <br />
        <p className="mb-5">Want to work with us? You're in good company!</p>
        <h6>Requirements</h6>
        <ul className="mb-5">
          <li>
            Great troubleshooting and analytical skills combined with the desire
            to tackle challenges head-on
          </li>
          <li>
            3+ years of experience in back-end development working either with
            multiple smaller projects simultaneously or large-scale applications
          </li>
          <li>
            Experience with HTML, JavaScript, CSS, PHP, Symphony and/or Laravel
          </li>
          <li>
            Working regularly with APIs and Web Services (REST, GrapthQL, SOAP,
            etc).
          </li>
        </ul>
        <h6>Benefits</h6>
        <ul>
          <li>
            Early finish on Fridays for our end of week catch up (4:30 finish,
            and drink of your choice from the bar)
          </li>
          <li>
            28 days holiday (including bank holidays) rising by 1 day per year
            PLUS an additional day off on your birthday
          </li>
          <li>Generous annual bonus.</li>
          <li>Healthcare package</li>
          <li>Paid community days to volunteer for a charity of your choice</li>
          <li>
            £100 contribution for your own personal learning and development
          </li>
          <li>Free Breakfast on Mondays and free snacks in the office.</li>
        </ul>
      </div>
    </div>
  );
};

export default Description;
