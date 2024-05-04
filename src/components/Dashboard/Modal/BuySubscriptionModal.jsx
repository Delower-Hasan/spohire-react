import { useSelector } from "react-redux";
import PriceRange from "../../../pages/pricing/PriceRange";
import BuySubscriptionModalContent from "../../PricingPages/BuySubscriptionModalContent";
import { useLocation } from "react-router-dom";
import { useSubscriptionCheck } from "../../../hooks/useSubscriptionCheck";

function BuySubscriptionModal({ user }) {
  const location = useLocation(); // Get the current location
  const { isSubscriptionCheck } = useSubscriptionCheck();
  const { pathname } = location;

  // Check if the current pathname is "/dashboard/viewProfile"
  const isViewProfile = pathname === "/dashboard/viewProfile";

  const handleCloseModal = () => {
    const modal = document.getElementById("staticBackdrop");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
    }
  };

  return (
    <>
      {isViewProfile ? (
        <>
          <div
            className={`modal fade ${!isSubscriptionCheck ? "show" : ""}`} // Add the "show" class to make the modal visible
            id="staticBackdrop"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            style={{ display: `${!isSubscriptionCheck ? "block" : "none"}` }} // Set display:block to show the modal
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <PriceRange
                      component={<BuySubscriptionModalContent user={user} />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <PriceRange
                    component={<BuySubscriptionModalContent user={user} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BuySubscriptionModal;
