import { useEffect, useState } from "react";
import { FaCheck, FaShieldAlt, FaHeadset, FaHistory } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import FileField from "../../components/FormFields/FileField/FileField";
import { addSubscriptionApi } from "../../redux/services/auth";
import { getLatestValidSubscription } from "../../utils/validarteSubscription";
function Pricing() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Pricing - AreYouFiler";
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  console.log("🚀 ~ Pricing ~ isSubscribed:", isSubscribed);
  const features = [
    "Custom branded client portal",
    "Custom domain (whitelable)",
    "Client communication center",
    "Unlimited client accounts",
    "All calculation tools",
    "Document management",
    "Custom dashboard",
    "Free website templates",
    "Payment Gateway Integration",
    "Priority support",
    "Team chat",
    "Dedicated Account Manager",
  ];

  const pricingPlans = [
    {
      id: "annual",
      name: "Annual Plan",
      priceFormatted: "Rs. 5,000",
      price: 5000,
      cycle: "per-year",
      discount: "Save Rs. 24,000 yearly",
      description: "Best value for established firms",
      commitment: "12-month commitment + Onetime Rs. 25,000 Setup Fee",
      cta: "Get Started",
      highlight: true,
    },
    {
      id: "biannual",
      name: "6-Month Plan",
      priceFormatted: "Rs. 6,000",
      price: 6000,
      cycle: "6-month",
      discount: "Save Rs. 6,000 yearly",
      description: "Great for growing practices",
      commitment: "6-month commitment + Onetime Rs. 25,000 Setup Fee",
      cta: "Choose Plan",
      highlight: false,
    },
    {
      id: "quarterly",
      name: "Quarterly Plan",
      price: 7000,
      priceFormatted: "Rs. 7,000",
      cycle: "per-month",
      discount: "Flexible option",
      description: "Perfect for trying our platform",
      commitment: "3-month commitment  + Onetime Rs. 25,000 Setup Fee",
      cta: "Select Plan",
      highlight: false,
    },
  ];
  const bankDetails = {
    accountName: "Just Call (Private) Limited",
    accountNumber: "PK42MPBL9832177140101991",
    bankName: "Habib Metro",
    ifscCode: "", // or SWIFT code depending on country
    branch: "",
  };
  const handleSubscriptionClick = (plan) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };
  const handleSubmitPaymentProof = async (formData) => {
    const params = {
      userId: user.id,
      reciept: formData.reciept,
      planName: selectedPlan.id,
      monthlyPrice: selectedPlan.price,
      cycle: selectedPlan?.cycle,
    };
    const done = await dispatch(addSubscriptionApi(token, params));
    if (done?.success) {
      setIsOpen(false);
      navigateTo("/processing");
    }
  };
  useEffect(() => {
    const { isValid } = getLatestValidSubscription(user?.subscriptions);
    setIsSubscribed(isValid);
  }, [user]);
  // useEffect(() => {
  //   if (isSubscribed) {
  //     navigateTo("/lawfirm/template");
  //   }
  //   return () => {};
  // }, [isSubscribed, navigateTo]);
  return (
    <div>
      {/* Pricing Section */}
      <section className="section">
        <div className="">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Select Your Plan</h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                All plans include the full suite of features. Choose your
                billing cycle for the best value.
              </p>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${
                    plan.highlight
                      ? `bg-primary-50 border-2 border-primary-500 shadow-lg scale-105 ${
                          !isOpen && "z-10"
                        }`
                      : "bg-white border border-secondary-200 shadow"
                  }`}
                >
                  {plan.highlight && (
                    <div className="bg-primary-500 text-white text-center py-2 font-medium">
                      Most Popular
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-secondary-600 mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-end">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-secondary-600 ml-2">
                          {plan.cycle}
                        </span>
                      </div>
                      <div
                        className={`text-sm mt-1 ${
                          plan.highlight
                            ? "text-primary-700 font-medium"
                            : "text-secondary-500"
                        }`}
                      >
                        {plan.discount}
                      </div>
                      <div className="text-sm mt-1 text-secondary-500">
                        {plan.commitment}
                      </div>
                    </div>

                    <div className="mb-8">
                      <ul className="space-y-3">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <FaCheck
                              className={`mt-1 mr-2 ${
                                plan.highlight
                                  ? "text-primary-600"
                                  : "text-secondary-500"
                              }`}
                            />
                            <span className="text-secondary-700">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => handleSubscriptionClick(plan)}
                      className={`absolute block max-w-64 bottom-2 text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                        plan.highlight
                          ? "bg-primary-600 hover:bg-primary-700 text-white"
                          : "bg-secondary-800 hover:bg-secondary-900 "
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Payment Reciept"
        noStartMargin={true}
        body={
          <>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🏦 Bank Details
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Account Name:</strong>{" "}
                  {bankDetails?.accountName || "N/A"}
                </div>
                <div>
                  <strong>Account Number:</strong>{" "}
                  {bankDetails?.accountNumber || "N/A"}
                </div>
                <div>
                  <strong>Bank Name:</strong> {bankDetails?.bankName || "N/A"}
                </div>
                <div>
                  <strong>IFSC Code:</strong> {bankDetails?.ifscCode || "N/A"}
                </div>
                <div>
                  <strong>Branch:</strong> {bankDetails?.branch || "N/A"}
                </div>
              </div>
            </section>
            <section className="py-2">
              <div
                className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                role="alert"
              >
                <span className="font-medium">Instruction!</span> Please upload
                a clear image or PDF of your transaction receipt. Max file size:
                5MB.
              </div>
            </section>
            <form onSubmit={handleSubmit(handleSubmitPaymentProof)}>
              <FileField
                name={"reciept"}
                control={control}
                errors={errors}
                label={"Reciept"}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
              <Button type="submit">Continue</Button>
            </form>
          </>
        }
      />
    </div>
  );
}

export default Pricing;
