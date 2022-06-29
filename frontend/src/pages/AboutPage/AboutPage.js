function AboutPage() {
  const persons = [
    {
      img: "",
      name: "João Batista",
    },
    {
      img: "",
      name: "Eduardo Alcântara",
    },
    {
      img: "",
      name: "Fernando Trinta",
    },
    {
      img: "",
      name: "Gabriel Suassuna",
    },
    {
      img: "",
      name: "Pedro Victor",
    },
  ];

  return (
    <div className="flex flex-col px-20 mt-10">
      <div className="flex flex-row items-center">
        <img
          className="w-40"
          alt="logo"
          src={require("../../assets/img/logo.png")}
        />
        <h1 className="font-bold ml-10 text-3xl">
          Sistema Feedback Universitário
        </h1>
      </div>
      <p className="mt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        lobortis id enim ac aliquam. Donec varius, nunc nec pretium elementum,
        magna massa vulputate nisl, quis egestas ante eros sit amet tellus.
        Maecenas justo tellus, consectetur non congue vel, feugiat id purus.
        Fusce non congue odio. Morbi dignissim interdum posuere. Vestibulum
        faucibus tortor sed sagittis iaculis. Proin auctor posuere blandit.
        Integer porta ullamcorper erat ac venenatis. Integer non lacus ex. Etiam
        ut luctus leo, a ullamcorper lorem.
      </p>

      <div className="flex flex-row justify-center mt-10">
        {persons.map((person) => {
          return (
            <div className="flex flex-col mx-5 items-center">
              <div className="rounded-full w-20 h-20 bg-slate-500"></div>
              <p className="mt-5">{person.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutPage;
