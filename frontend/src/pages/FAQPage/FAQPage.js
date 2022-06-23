import FAQ from "../../components/FAQ/FAQ";
import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useEffect, useState } from "react";

function FAQPage() {
  let query = useQuery();
  let [faqState, setFaqState] = useState([]);
  let [loaded, setLoaded] = useState(false);

  const { data: faq, error: faqError } = useSWR(
    `http://localhost:3000/faq/`,
    fetcher
  );
  
  useEffect(()=>{
    if(!faq || !faq.data || loaded){
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
  },[faqState, faq, loaded]);

  return (
    <div>
      <h1>FAQPage</h1>
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
