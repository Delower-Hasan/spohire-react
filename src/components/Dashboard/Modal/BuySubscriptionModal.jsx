import { useSelector } from "react-redux";
import PriceRange from "../../../pages/pricing/PriceRange";
import BuySubscriptionModalContent from "../../PricingPages/BuySubscriptionModalContent";

function BuySubscriptionModal({ user }) {
  const { subscriptions } = useSelector((store) => store.auth);

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
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
    </>
  );
}

export default BuySubscriptionModal;
