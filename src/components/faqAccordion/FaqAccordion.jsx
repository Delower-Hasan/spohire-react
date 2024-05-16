import { useState } from "react";
import minus from "../../assets/accordion-minus.png";
import plus from "../../assets/accordion-plus.png";
import add_circle from "../../assets/add_circle.png";
import down from "../../assets/downarrow.png";
import up from "../../assets/uparrow.png";
import "./FaqAccordion.css";

const FaqAccordion = ({ fontSize }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const accordionData = [
    {
      ques: "At what level of play does one need to be to add a player or coach to the database for seeking a sports club?",
      ans: "Players and coaches at every level can enter the transfer market. We are designed for everyone.",
    },
    {
      ques: "For which sports does the transfer market operate?",
      ans: "The transfer market operates for football, basketball, volleyball, and handball.",
    },

    {
      ques: "Can announcements be added for other sports?",
      ans: "Of course, announcements can be added for all sports.",
    },
    {
      ques: "I'm a coach, can I add my player to the transfer market?",
      ans: "Of course, you can, provided the player consents. In this case, it's advisable to also include a written statement from the player.",
    },
    {
      ques: "How do the packages work when adding to the transfer market?",
      ans: "Bronze Package: Designed for the lowest level of play. Low anonymity, every subscription can see the added players and coaches from this package || Silver Package: Designed for the intermediate level of play. Moderate anonymity, silver and gold subscriptions can see the added players and coaches from this package || Gold Package: Designed for the highest level of play. Very high anonymity, only gold subscriptions can see the players and coaches added from this package",
    },
    {
      ques: "How do subscriptions work for viewing the transfer market?",
      ans: "Bronze Package: Designed for the lowest level of play. Users can only browse players and coaches from the bronze package ||	Silver Package: Designed for the intermediate level of play. Users can browse players and coaches from the bronze and silver packages. ||	Gold Package: Designed for the highest level of play. Users can browse players and coaches from all packages, including gold.",
    },
    {
      ques: "I'm a sports agent. Can I add my players to the transfer market lists?",
      ans: "Of course, with the consent of the players. To do so, you need to create an account as a manager and purchase the appropriate packages when adding players.",
    },
    {
      ques: "Does Spohire charge fees for signed contracts?",
      ans: "No, the parties negotiate independently to finalize the details and sign the contract. The exception may be if one of the parties requests assistance.",
    },
    {
      ques: "Can I add multiple players or coaches from one account?",
      ans: "Yes, if they consent to it.",
    },
    {
      ques: "Can a player add a coach to the transfer market list?",
      ans: "No, only coaches and managers can add coaches.",
    },
    {
      ques: "What if I just want to post a job advertisement and I'm not a player, coach, or manager?",
      ans: "In that case, when you create your account, you should select 'Function - Other.' It is dedicated to such situations.",
    },
    {
      ques: "Can I receive an invoice?",
      ans: "Yes, we issue invoices for each payment.",
    },
    {
      ques: "Can I delete or edit an advertisement after it's been posted?",
      ans: "Yes, you can delete or edit the advertisement after it has been posted.",
    },
    {
      ques: "Can I change my subscription package at any time?",
      ans: "Yes, you can upgrade to a higher subscription, but changing the subscription package incurs an additional fee for the remaining duration.",
    },
  ];

  const visibleData = showAll ? accordionData : accordionData.slice(0, 5);
  return (
    <div className="accordion section_padding">
      <div className="container">
        <div className="section_heading text-center">
          <h2 className={`${fontSize}`}>Frequently Asked Questions</h2>
        </div>
        <div>
          {visibleData.map((data, index) => (
            <div key={index} className="accordion_items mb-4 m-auto">
              <div
                onClick={() => setIsOpen(index === isOpen ? null : index)}
                className="d-flex align-items-center justify-content-between"
              >
                <p className="question text_color_19 fs-4 fw-medium">
                  {data.ques}
                </p>
                <img
                  className="deshtop_icon"
                  src={isOpen === index ? minus : plus}
                  alt="icon"
                />
                <div className="mobile_icons">
                  <img
                    className="mobile_icon"
                    src={isOpen === index ? up : down}
                    alt="icon"
                  />
                </div>
              </div>
              {isOpen === index && (
                <p className="answer text_color_19_7 fs-5 fw-medium">
                  {data.ans}
                </p>
              )}
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="d-flex justify-content-center">
            <button className="more_btn mt-lg-5" onClick={() => setShowAll(true)}>
              <img src={add_circle} alt="" /> More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqAccordion;
