import FAQ from "../../components/FAQ/FAQ";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useEffect, useState } from "react";
import { checkForErrors } from "../../utils/apiReq";
import URL from "../../config/api";

function FAQPage() {
  const faq = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis leo eget nisi ultricies posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis leo eget nisi ultricies posuere.",
      expanded: false,
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis leo eget nisi ultricies posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis leo eget nisi ultricies posuere.",
      expanded: false,
    },
  ];

  return (
    <div className="mt-6 ml-6 pb-10">
      <h1 className="text-4xl font-bold mb-6">FAQPage</h1>
      {faq.map((faq) => (
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
