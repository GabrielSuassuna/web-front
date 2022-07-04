import FAQ from "../../components/FAQ/FAQ";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useEffect, useState } from "react";
import { checkForErrors } from "../../utils/apiReq";
import URL from "../../config/api";

function FAQPage() {
  let [faqState, setFaqState] = useState([]);
  let [loaded, setLoaded] = useState(false);

  const { data: faq, error: faqError } = useSWR(`${URL}/faq/`, fetcher);

  checkForErrors([faqError]);

  useEffect(() => {
    if (!faq || !faq.data || loaded) {
      return;
    }
    let newFaq = faq.data.map((f) => {
      return {
        ...f,
        expanded: false,
      };
    });
    setFaqState(newFaq);
    setLoaded(true);
  }, [faqState, faq, loaded]);

  return (
    <div className="mt-6 ml-6 pb-10">
      <h1 className="text-4xl font-bold mb-6">FAQPage</h1>
      {faqState.map((faq) => (
        <FAQ
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
          expanded={faq.expanded}
        />
      ))}
    </div>
  );
}

export default FAQPage;
