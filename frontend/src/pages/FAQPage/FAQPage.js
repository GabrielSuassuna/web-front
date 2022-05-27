import FAQ from "../../components/FAQ/FAQ";

const DUMMY_FAQ = [
  {
    question: "NAO CONSIGO ACESSAR A AREA DE TRABALHO",
    answer:
      "Basta ir na página de exploração, acessível através do menu inicial.",
    expanded: true,
  },
  {
    question: "LOREM IPSUM?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    question: "DOR!",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
];

function FAQPage() {
  return (
    <div>
      <h1>FAQPage</h1>
      {DUMMY_FAQ.map((faq) => (
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
