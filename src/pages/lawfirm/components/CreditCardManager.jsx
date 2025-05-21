import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import InputMask from "react-input-mask";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CardManager = () => {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [cardData, setCardData] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
    focus: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

  const validate = () => {
    const errs = {};
    if (!cardData.name.trim()) {
      errs.name = "Cardholder name is required";
    } else if (cardData.name.trim().length < 3) {
      errs.name = "Name must be at least 3 characters";
    }

    // Remove spaces from number for validation
    const numberOnly = cardData.number.replace(/\s/g, "");
    if (!numberOnly) {
      errs.number = "Card number is required";
    } else if (!/^\d{13,19}$/.test(numberOnly)) {
      errs.number = "Card number must be 13 to 19 digits";
    }

    if (!cardData.expiry) {
      errs.expiry = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardData.expiry)) {
      errs.expiry = "Expiry must be in MM/YY format";
    } else {
      const [month, year] = cardData.expiry.split("/");
      const expiryDate = new Date(`20${year}`, month);
      const now = new Date();
      if (expiryDate < now) {
        errs.expiry = "Card has expired";
      }
    }

    if (!cardData.cvc) {
      errs.cvc = "CVC is required";
    } else if (!/^\d{3,4}$/.test(cardData.cvc)) {
      errs.cvc = "CVC must be 3 or 4 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddCard = () => {
    if (!validate()) return;

    setCards([...cards, cardData]);
    setCardData({ cvc: "", expiry: "", name: "", number: "", focus: "" });
    setShowForm(false);
    setErrors({});
  };

  const handleCancel = () => {
    setCardData({ cvc: "", expiry: "", name: "", number: "", focus: "" });
    setShowForm(false);
    setErrors({});
  };

  return (
    <div className="max-w-lg  p-4 relative">
      <h2 className="text-2xl font-bold mb-4 text-left">My Cards</h2>

      {cards.length > 0 ? (
        <ul className="space-y-3 mb-6">
          {cards.map((card, i) => (
            <li key={i} className="border p-4 rounded shadow">
              <p className="font-semibold">{card.name}</p>
              <p>**** **** **** {card.number.slice(-4)}</p>
              <p>Expires: {card.expiry}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-6">No cards saved.</p>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded absolute top-5 right-0"
        >
          Add New Card
        </button>
      )}

      {showForm && (
        <div className="mt-6">
          <Cards
            cvc={cardData.cvc}
            expiry={cardData.expiry}
            name={cardData.name}
            number={cardData.number}
            focused={cardData.focus}
          />
          <div className="space-y-2 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Cardholder Name"
              value={cardData.name}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className={`w-full px-3 py-2 border rounded ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <InputMask
              mask="9999 9999 9999 9999 999"
              maskChar={null}
              name="number"
              placeholder="Card Number"
              value={cardData.number}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className={`w-full px-3 py-2 border rounded ${
                errors.number ? "border-red-500" : ""
              }`}
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number}</p>
            )}

            <InputMask
              mask="99/99"
              maskChar={null}
              name="expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className={`w-full px-3 py-2 border rounded ${
                errors.expiry ? "border-red-500" : ""
              }`}
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm">{errors.expiry}</p>
            )}

            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              maxLength={4}
              value={cardData.cvc}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className={`w-full px-3 py-2 border rounded ${
                errors.cvc ? "border-red-500" : ""
              }`}
            />
            {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}

            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleAddCard}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Card
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardManager;
